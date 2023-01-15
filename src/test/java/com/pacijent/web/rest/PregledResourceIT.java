package com.pacijent.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.pacijent.IntegrationTest;
import com.pacijent.domain.Pregled;
import com.pacijent.domain.enumeration.TIP;
import com.pacijent.repository.PregledRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link PregledResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class PregledResourceIT {

    private static final String DEFAULT_IME = "AAAAAAAAAA";
    private static final String UPDATED_IME = "BBBBBBBBBB";

    private static final TIP DEFAULT_TIP = TIP.HITAN;
    private static final TIP UPDATED_TIP = TIP.REDOVAN;

    private static final String ENTITY_API_URL = "/api/pregleds";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private PregledRepository pregledRepository;

    @Mock
    private PregledRepository pregledRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPregledMockMvc;

    private Pregled pregled;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Pregled createEntity(EntityManager em) {
        Pregled pregled = new Pregled().ime(DEFAULT_IME).tip(DEFAULT_TIP);
        return pregled;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Pregled createUpdatedEntity(EntityManager em) {
        Pregled pregled = new Pregled().ime(UPDATED_IME).tip(UPDATED_TIP);
        return pregled;
    }

    @BeforeEach
    public void initTest() {
        pregled = createEntity(em);
    }

    @Test
    @Transactional
    void createPregled() throws Exception {
        int databaseSizeBeforeCreate = pregledRepository.findAll().size();
        // Create the Pregled
        restPregledMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pregled)))
            .andExpect(status().isCreated());

        // Validate the Pregled in the database
        List<Pregled> pregledList = pregledRepository.findAll();
        assertThat(pregledList).hasSize(databaseSizeBeforeCreate + 1);
        Pregled testPregled = pregledList.get(pregledList.size() - 1);
        assertThat(testPregled.getIme()).isEqualTo(DEFAULT_IME);
        assertThat(testPregled.getTip()).isEqualTo(DEFAULT_TIP);
    }

    @Test
    @Transactional
    void createPregledWithExistingId() throws Exception {
        // Create the Pregled with an existing ID
        pregled.setId(1L);

        int databaseSizeBeforeCreate = pregledRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restPregledMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pregled)))
            .andExpect(status().isBadRequest());

        // Validate the Pregled in the database
        List<Pregled> pregledList = pregledRepository.findAll();
        assertThat(pregledList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkImeIsRequired() throws Exception {
        int databaseSizeBeforeTest = pregledRepository.findAll().size();
        // set the field null
        pregled.setIme(null);

        // Create the Pregled, which fails.

        restPregledMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pregled)))
            .andExpect(status().isBadRequest());

        List<Pregled> pregledList = pregledRepository.findAll();
        assertThat(pregledList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllPregleds() throws Exception {
        // Initialize the database
        pregledRepository.saveAndFlush(pregled);

        // Get all the pregledList
        restPregledMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pregled.getId().intValue())))
            .andExpect(jsonPath("$.[*].ime").value(hasItem(DEFAULT_IME)))
            .andExpect(jsonPath("$.[*].tip").value(hasItem(DEFAULT_TIP.toString())));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllPregledsWithEagerRelationshipsIsEnabled() throws Exception {
        when(pregledRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restPregledMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(pregledRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllPregledsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(pregledRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restPregledMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(pregledRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    @Transactional
    void getPregled() throws Exception {
        // Initialize the database
        pregledRepository.saveAndFlush(pregled);

        // Get the pregled
        restPregledMockMvc
            .perform(get(ENTITY_API_URL_ID, pregled.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(pregled.getId().intValue()))
            .andExpect(jsonPath("$.ime").value(DEFAULT_IME))
            .andExpect(jsonPath("$.tip").value(DEFAULT_TIP.toString()));
    }

    @Test
    @Transactional
    void getNonExistingPregled() throws Exception {
        // Get the pregled
        restPregledMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingPregled() throws Exception {
        // Initialize the database
        pregledRepository.saveAndFlush(pregled);

        int databaseSizeBeforeUpdate = pregledRepository.findAll().size();

        // Update the pregled
        Pregled updatedPregled = pregledRepository.findById(pregled.getId()).get();
        // Disconnect from session so that the updates on updatedPregled are not directly saved in db
        em.detach(updatedPregled);
        updatedPregled.ime(UPDATED_IME).tip(UPDATED_TIP);

        restPregledMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedPregled.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedPregled))
            )
            .andExpect(status().isOk());

        // Validate the Pregled in the database
        List<Pregled> pregledList = pregledRepository.findAll();
        assertThat(pregledList).hasSize(databaseSizeBeforeUpdate);
        Pregled testPregled = pregledList.get(pregledList.size() - 1);
        assertThat(testPregled.getIme()).isEqualTo(UPDATED_IME);
        assertThat(testPregled.getTip()).isEqualTo(UPDATED_TIP);
    }

    @Test
    @Transactional
    void putNonExistingPregled() throws Exception {
        int databaseSizeBeforeUpdate = pregledRepository.findAll().size();
        pregled.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPregledMockMvc
            .perform(
                put(ENTITY_API_URL_ID, pregled.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(pregled))
            )
            .andExpect(status().isBadRequest());

        // Validate the Pregled in the database
        List<Pregled> pregledList = pregledRepository.findAll();
        assertThat(pregledList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchPregled() throws Exception {
        int databaseSizeBeforeUpdate = pregledRepository.findAll().size();
        pregled.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPregledMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(pregled))
            )
            .andExpect(status().isBadRequest());

        // Validate the Pregled in the database
        List<Pregled> pregledList = pregledRepository.findAll();
        assertThat(pregledList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamPregled() throws Exception {
        int databaseSizeBeforeUpdate = pregledRepository.findAll().size();
        pregled.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPregledMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pregled)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Pregled in the database
        List<Pregled> pregledList = pregledRepository.findAll();
        assertThat(pregledList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdatePregledWithPatch() throws Exception {
        // Initialize the database
        pregledRepository.saveAndFlush(pregled);

        int databaseSizeBeforeUpdate = pregledRepository.findAll().size();

        // Update the pregled using partial update
        Pregled partialUpdatedPregled = new Pregled();
        partialUpdatedPregled.setId(pregled.getId());

        partialUpdatedPregled.ime(UPDATED_IME).tip(UPDATED_TIP);

        restPregledMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPregled.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPregled))
            )
            .andExpect(status().isOk());

        // Validate the Pregled in the database
        List<Pregled> pregledList = pregledRepository.findAll();
        assertThat(pregledList).hasSize(databaseSizeBeforeUpdate);
        Pregled testPregled = pregledList.get(pregledList.size() - 1);
        assertThat(testPregled.getIme()).isEqualTo(UPDATED_IME);
        assertThat(testPregled.getTip()).isEqualTo(UPDATED_TIP);
    }

    @Test
    @Transactional
    void fullUpdatePregledWithPatch() throws Exception {
        // Initialize the database
        pregledRepository.saveAndFlush(pregled);

        int databaseSizeBeforeUpdate = pregledRepository.findAll().size();

        // Update the pregled using partial update
        Pregled partialUpdatedPregled = new Pregled();
        partialUpdatedPregled.setId(pregled.getId());

        partialUpdatedPregled.ime(UPDATED_IME).tip(UPDATED_TIP);

        restPregledMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPregled.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPregled))
            )
            .andExpect(status().isOk());

        // Validate the Pregled in the database
        List<Pregled> pregledList = pregledRepository.findAll();
        assertThat(pregledList).hasSize(databaseSizeBeforeUpdate);
        Pregled testPregled = pregledList.get(pregledList.size() - 1);
        assertThat(testPregled.getIme()).isEqualTo(UPDATED_IME);
        assertThat(testPregled.getTip()).isEqualTo(UPDATED_TIP);
    }

    @Test
    @Transactional
    void patchNonExistingPregled() throws Exception {
        int databaseSizeBeforeUpdate = pregledRepository.findAll().size();
        pregled.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPregledMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, pregled.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(pregled))
            )
            .andExpect(status().isBadRequest());

        // Validate the Pregled in the database
        List<Pregled> pregledList = pregledRepository.findAll();
        assertThat(pregledList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchPregled() throws Exception {
        int databaseSizeBeforeUpdate = pregledRepository.findAll().size();
        pregled.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPregledMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(pregled))
            )
            .andExpect(status().isBadRequest());

        // Validate the Pregled in the database
        List<Pregled> pregledList = pregledRepository.findAll();
        assertThat(pregledList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamPregled() throws Exception {
        int databaseSizeBeforeUpdate = pregledRepository.findAll().size();
        pregled.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPregledMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(pregled)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Pregled in the database
        List<Pregled> pregledList = pregledRepository.findAll();
        assertThat(pregledList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deletePregled() throws Exception {
        // Initialize the database
        pregledRepository.saveAndFlush(pregled);

        int databaseSizeBeforeDelete = pregledRepository.findAll().size();

        // Delete the pregled
        restPregledMockMvc
            .perform(delete(ENTITY_API_URL_ID, pregled.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Pregled> pregledList = pregledRepository.findAll();
        assertThat(pregledList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
