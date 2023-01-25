package com.pacijent.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.pacijent.IntegrationTest;
import com.pacijent.domain.Ustanove;
import com.pacijent.repository.UstanoveRepository;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link UstanoveResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class UstanoveResourceIT {

    private static final String DEFAULT_IME = "AAAAAAAAAA";
    private static final String UPDATED_IME = "BBBBBBBBBB";

    private static final String DEFAULT_ADRESA = "AAAAAAAAAA";
    private static final String UPDATED_ADRESA = "BBBBBBBBBB";

    private static final String DEFAULT_TELEFON = "AAAAAAAAA";
    private static final String UPDATED_TELEFON = "BBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/ustanoves";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private UstanoveRepository ustanoveRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restUstanoveMockMvc;

    private Ustanove ustanove;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Ustanove createEntity(EntityManager em) {
        Ustanove ustanove = new Ustanove().ime(DEFAULT_IME).adresa(DEFAULT_ADRESA).telefon(DEFAULT_TELEFON).email(DEFAULT_EMAIL);
        return ustanove;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Ustanove createUpdatedEntity(EntityManager em) {
        Ustanove ustanove = new Ustanove().ime(UPDATED_IME).adresa(UPDATED_ADRESA).telefon(UPDATED_TELEFON).email(UPDATED_EMAIL);
        return ustanove;
    }

    @BeforeEach
    public void initTest() {
        ustanove = createEntity(em);
    }

    @Test
    @Transactional
    void createUstanove() throws Exception {
        int databaseSizeBeforeCreate = ustanoveRepository.findAll().size();
        // Create the Ustanove
        restUstanoveMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ustanove)))
            .andExpect(status().isCreated());

        // Validate the Ustanove in the database
        List<Ustanove> ustanoveList = ustanoveRepository.findAll();
        assertThat(ustanoveList).hasSize(databaseSizeBeforeCreate + 1);
        Ustanove testUstanove = ustanoveList.get(ustanoveList.size() - 1);
        assertThat(testUstanove.getIme()).isEqualTo(DEFAULT_IME);
        assertThat(testUstanove.getAdresa()).isEqualTo(DEFAULT_ADRESA);
        assertThat(testUstanove.getTelefon()).isEqualTo(DEFAULT_TELEFON);
        assertThat(testUstanove.getEmail()).isEqualTo(DEFAULT_EMAIL);
    }

    @Test
    @Transactional
    void createUstanoveWithExistingId() throws Exception {
        // Create the Ustanove with an existing ID
        ustanove.setId(1L);

        int databaseSizeBeforeCreate = ustanoveRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restUstanoveMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ustanove)))
            .andExpect(status().isBadRequest());

        // Validate the Ustanove in the database
        List<Ustanove> ustanoveList = ustanoveRepository.findAll();
        assertThat(ustanoveList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkImeIsRequired() throws Exception {
        int databaseSizeBeforeTest = ustanoveRepository.findAll().size();
        // set the field null
        ustanove.setIme(null);

        // Create the Ustanove, which fails.

        restUstanoveMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ustanove)))
            .andExpect(status().isBadRequest());

        List<Ustanove> ustanoveList = ustanoveRepository.findAll();
        assertThat(ustanoveList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkAdresaIsRequired() throws Exception {
        int databaseSizeBeforeTest = ustanoveRepository.findAll().size();
        // set the field null
        ustanove.setAdresa(null);

        // Create the Ustanove, which fails.

        restUstanoveMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ustanove)))
            .andExpect(status().isBadRequest());

        List<Ustanove> ustanoveList = ustanoveRepository.findAll();
        assertThat(ustanoveList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkTelefonIsRequired() throws Exception {
        int databaseSizeBeforeTest = ustanoveRepository.findAll().size();
        // set the field null
        ustanove.setTelefon(null);

        // Create the Ustanove, which fails.

        restUstanoveMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ustanove)))
            .andExpect(status().isBadRequest());

        List<Ustanove> ustanoveList = ustanoveRepository.findAll();
        assertThat(ustanoveList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkEmailIsRequired() throws Exception {
        int databaseSizeBeforeTest = ustanoveRepository.findAll().size();
        // set the field null
        ustanove.setEmail(null);

        // Create the Ustanove, which fails.

        restUstanoveMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ustanove)))
            .andExpect(status().isBadRequest());

        List<Ustanove> ustanoveList = ustanoveRepository.findAll();
        assertThat(ustanoveList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllUstanoves() throws Exception {
        // Initialize the database
        ustanoveRepository.saveAndFlush(ustanove);

        // Get all the ustanoveList
        restUstanoveMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ustanove.getId().intValue())))
            .andExpect(jsonPath("$.[*].ime").value(hasItem(DEFAULT_IME)))
            .andExpect(jsonPath("$.[*].adresa").value(hasItem(DEFAULT_ADRESA)))
            .andExpect(jsonPath("$.[*].telefon").value(hasItem(DEFAULT_TELEFON)))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)));
    }

    @Test
    @Transactional
    void getUstanove() throws Exception {
        // Initialize the database
        ustanoveRepository.saveAndFlush(ustanove);

        // Get the ustanove
        restUstanoveMockMvc
            .perform(get(ENTITY_API_URL_ID, ustanove.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(ustanove.getId().intValue()))
            .andExpect(jsonPath("$.ime").value(DEFAULT_IME))
            .andExpect(jsonPath("$.adresa").value(DEFAULT_ADRESA))
            .andExpect(jsonPath("$.telefon").value(DEFAULT_TELEFON))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL));
    }

    @Test
    @Transactional
    void getNonExistingUstanove() throws Exception {
        // Get the ustanove
        restUstanoveMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingUstanove() throws Exception {
        // Initialize the database
        ustanoveRepository.saveAndFlush(ustanove);

        int databaseSizeBeforeUpdate = ustanoveRepository.findAll().size();

        // Update the ustanove
        Ustanove updatedUstanove = ustanoveRepository.findById(ustanove.getId()).get();
        // Disconnect from session so that the updates on updatedUstanove are not directly saved in db
        em.detach(updatedUstanove);
        updatedUstanove.ime(UPDATED_IME).adresa(UPDATED_ADRESA).telefon(UPDATED_TELEFON).email(UPDATED_EMAIL);

        restUstanoveMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedUstanove.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedUstanove))
            )
            .andExpect(status().isOk());

        // Validate the Ustanove in the database
        List<Ustanove> ustanoveList = ustanoveRepository.findAll();
        assertThat(ustanoveList).hasSize(databaseSizeBeforeUpdate);
        Ustanove testUstanove = ustanoveList.get(ustanoveList.size() - 1);
        assertThat(testUstanove.getIme()).isEqualTo(UPDATED_IME);
        assertThat(testUstanove.getAdresa()).isEqualTo(UPDATED_ADRESA);
        assertThat(testUstanove.getTelefon()).isEqualTo(UPDATED_TELEFON);
        assertThat(testUstanove.getEmail()).isEqualTo(UPDATED_EMAIL);
    }

    @Test
    @Transactional
    void putNonExistingUstanove() throws Exception {
        int databaseSizeBeforeUpdate = ustanoveRepository.findAll().size();
        ustanove.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUstanoveMockMvc
            .perform(
                put(ENTITY_API_URL_ID, ustanove.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(ustanove))
            )
            .andExpect(status().isBadRequest());

        // Validate the Ustanove in the database
        List<Ustanove> ustanoveList = ustanoveRepository.findAll();
        assertThat(ustanoveList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchUstanove() throws Exception {
        int databaseSizeBeforeUpdate = ustanoveRepository.findAll().size();
        ustanove.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUstanoveMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(ustanove))
            )
            .andExpect(status().isBadRequest());

        // Validate the Ustanove in the database
        List<Ustanove> ustanoveList = ustanoveRepository.findAll();
        assertThat(ustanoveList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamUstanove() throws Exception {
        int databaseSizeBeforeUpdate = ustanoveRepository.findAll().size();
        ustanove.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUstanoveMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ustanove)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Ustanove in the database
        List<Ustanove> ustanoveList = ustanoveRepository.findAll();
        assertThat(ustanoveList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateUstanoveWithPatch() throws Exception {
        // Initialize the database
        ustanoveRepository.saveAndFlush(ustanove);

        int databaseSizeBeforeUpdate = ustanoveRepository.findAll().size();

        // Update the ustanove using partial update
        Ustanove partialUpdatedUstanove = new Ustanove();
        partialUpdatedUstanove.setId(ustanove.getId());

        partialUpdatedUstanove.ime(UPDATED_IME).adresa(UPDATED_ADRESA);

        restUstanoveMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedUstanove.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedUstanove))
            )
            .andExpect(status().isOk());

        // Validate the Ustanove in the database
        List<Ustanove> ustanoveList = ustanoveRepository.findAll();
        assertThat(ustanoveList).hasSize(databaseSizeBeforeUpdate);
        Ustanove testUstanove = ustanoveList.get(ustanoveList.size() - 1);
        assertThat(testUstanove.getIme()).isEqualTo(UPDATED_IME);
        assertThat(testUstanove.getAdresa()).isEqualTo(UPDATED_ADRESA);
        assertThat(testUstanove.getTelefon()).isEqualTo(DEFAULT_TELEFON);
        assertThat(testUstanove.getEmail()).isEqualTo(DEFAULT_EMAIL);
    }

    @Test
    @Transactional
    void fullUpdateUstanoveWithPatch() throws Exception {
        // Initialize the database
        ustanoveRepository.saveAndFlush(ustanove);

        int databaseSizeBeforeUpdate = ustanoveRepository.findAll().size();

        // Update the ustanove using partial update
        Ustanove partialUpdatedUstanove = new Ustanove();
        partialUpdatedUstanove.setId(ustanove.getId());

        partialUpdatedUstanove.ime(UPDATED_IME).adresa(UPDATED_ADRESA).telefon(UPDATED_TELEFON).email(UPDATED_EMAIL);

        restUstanoveMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedUstanove.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedUstanove))
            )
            .andExpect(status().isOk());

        // Validate the Ustanove in the database
        List<Ustanove> ustanoveList = ustanoveRepository.findAll();
        assertThat(ustanoveList).hasSize(databaseSizeBeforeUpdate);
        Ustanove testUstanove = ustanoveList.get(ustanoveList.size() - 1);
        assertThat(testUstanove.getIme()).isEqualTo(UPDATED_IME);
        assertThat(testUstanove.getAdresa()).isEqualTo(UPDATED_ADRESA);
        assertThat(testUstanove.getTelefon()).isEqualTo(UPDATED_TELEFON);
        assertThat(testUstanove.getEmail()).isEqualTo(UPDATED_EMAIL);
    }

    @Test
    @Transactional
    void patchNonExistingUstanove() throws Exception {
        int databaseSizeBeforeUpdate = ustanoveRepository.findAll().size();
        ustanove.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUstanoveMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, ustanove.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(ustanove))
            )
            .andExpect(status().isBadRequest());

        // Validate the Ustanove in the database
        List<Ustanove> ustanoveList = ustanoveRepository.findAll();
        assertThat(ustanoveList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchUstanove() throws Exception {
        int databaseSizeBeforeUpdate = ustanoveRepository.findAll().size();
        ustanove.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUstanoveMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(ustanove))
            )
            .andExpect(status().isBadRequest());

        // Validate the Ustanove in the database
        List<Ustanove> ustanoveList = ustanoveRepository.findAll();
        assertThat(ustanoveList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamUstanove() throws Exception {
        int databaseSizeBeforeUpdate = ustanoveRepository.findAll().size();
        ustanove.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUstanoveMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(ustanove)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Ustanove in the database
        List<Ustanove> ustanoveList = ustanoveRepository.findAll();
        assertThat(ustanoveList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteUstanove() throws Exception {
        // Initialize the database
        ustanoveRepository.saveAndFlush(ustanove);

        int databaseSizeBeforeDelete = ustanoveRepository.findAll().size();

        // Delete the ustanove
        restUstanoveMockMvc
            .perform(delete(ENTITY_API_URL_ID, ustanove.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Ustanove> ustanoveList = ustanoveRepository.findAll();
        assertThat(ustanoveList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
