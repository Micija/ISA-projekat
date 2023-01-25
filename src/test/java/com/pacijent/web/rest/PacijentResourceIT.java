package com.pacijent.web.rest;

import static com.pacijent.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.pacijent.IntegrationTest;
import com.pacijent.domain.Pacijent;
import com.pacijent.domain.enumeration.POL;
import com.pacijent.repository.PacijentRepository;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
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
 * Integration tests for the {@link PacijentResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class PacijentResourceIT {

    private static final String DEFAULT_IME = "AAAAAAAAAA";
    private static final String UPDATED_IME = "BBBBBBBBBB";

    private static final String DEFAULT_PREZIME = "AAAAAAAAAA";
    private static final String UPDATED_PREZIME = "BBBBBBBBBB";

    private static final String DEFAULT_JMBG = "AAAAAAAAAAAAA";
    private static final String UPDATED_JMBG = "BBBBBBBBBBBBB";

    private static final String DEFAULT_ADRESA = "AAAAAAAAAA";
    private static final String UPDATED_ADRESA = "BBBBBBBBBB";

    private static final String DEFAULT_TELEFON = "AAAAAAAAA";
    private static final String UPDATED_TELEFON = "BBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_DATUM_RODJENJA = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_DATUM_RODJENJA = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final POL DEFAULT_POL = POL.MUSKO;
    private static final POL UPDATED_POL = POL.ZENSKO;

    private static final String ENTITY_API_URL = "/api/pacijents";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private PacijentRepository pacijentRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPacijentMockMvc;

    private Pacijent pacijent;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Pacijent createEntity(EntityManager em) {
        Pacijent pacijent = new Pacijent()
            .ime(DEFAULT_IME)
            .prezime(DEFAULT_PREZIME)
            .jmbg(DEFAULT_JMBG)
            .adresa(DEFAULT_ADRESA)
            .telefon(DEFAULT_TELEFON)
            .email(DEFAULT_EMAIL)
            .datumRodjenja(DEFAULT_DATUM_RODJENJA)
            .pol(DEFAULT_POL);
        return pacijent;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Pacijent createUpdatedEntity(EntityManager em) {
        Pacijent pacijent = new Pacijent()
            .ime(UPDATED_IME)
            .prezime(UPDATED_PREZIME)
            .jmbg(UPDATED_JMBG)
            .adresa(UPDATED_ADRESA)
            .telefon(UPDATED_TELEFON)
            .email(UPDATED_EMAIL)
            .datumRodjenja(UPDATED_DATUM_RODJENJA)
            .pol(UPDATED_POL);
        return pacijent;
    }

    @BeforeEach
    public void initTest() {
        pacijent = createEntity(em);
    }

    @Test
    @Transactional
    void createPacijent() throws Exception {
        int databaseSizeBeforeCreate = pacijentRepository.findAll().size();
        // Create the Pacijent
        restPacijentMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pacijent)))
            .andExpect(status().isCreated());

        // Validate the Pacijent in the database
        List<Pacijent> pacijentList = pacijentRepository.findAll();
        assertThat(pacijentList).hasSize(databaseSizeBeforeCreate + 1);
        Pacijent testPacijent = pacijentList.get(pacijentList.size() - 1);
        assertThat(testPacijent.getIme()).isEqualTo(DEFAULT_IME);
        assertThat(testPacijent.getPrezime()).isEqualTo(DEFAULT_PREZIME);
        assertThat(testPacijent.getJmbg()).isEqualTo(DEFAULT_JMBG);
        assertThat(testPacijent.getAdresa()).isEqualTo(DEFAULT_ADRESA);
        assertThat(testPacijent.getTelefon()).isEqualTo(DEFAULT_TELEFON);
        assertThat(testPacijent.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testPacijent.getDatumRodjenja()).isEqualTo(DEFAULT_DATUM_RODJENJA);
        assertThat(testPacijent.getPol()).isEqualTo(DEFAULT_POL);
    }

    @Test
    @Transactional
    void createPacijentWithExistingId() throws Exception {
        // Create the Pacijent with an existing ID
        pacijent.setId(1L);

        int databaseSizeBeforeCreate = pacijentRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restPacijentMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pacijent)))
            .andExpect(status().isBadRequest());

        // Validate the Pacijent in the database
        List<Pacijent> pacijentList = pacijentRepository.findAll();
        assertThat(pacijentList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkImeIsRequired() throws Exception {
        int databaseSizeBeforeTest = pacijentRepository.findAll().size();
        // set the field null
        pacijent.setIme(null);

        // Create the Pacijent, which fails.

        restPacijentMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pacijent)))
            .andExpect(status().isBadRequest());

        List<Pacijent> pacijentList = pacijentRepository.findAll();
        assertThat(pacijentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkPrezimeIsRequired() throws Exception {
        int databaseSizeBeforeTest = pacijentRepository.findAll().size();
        // set the field null
        pacijent.setPrezime(null);

        // Create the Pacijent, which fails.

        restPacijentMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pacijent)))
            .andExpect(status().isBadRequest());

        List<Pacijent> pacijentList = pacijentRepository.findAll();
        assertThat(pacijentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkJmbgIsRequired() throws Exception {
        int databaseSizeBeforeTest = pacijentRepository.findAll().size();
        // set the field null
        pacijent.setJmbg(null);

        // Create the Pacijent, which fails.

        restPacijentMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pacijent)))
            .andExpect(status().isBadRequest());

        List<Pacijent> pacijentList = pacijentRepository.findAll();
        assertThat(pacijentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkAdresaIsRequired() throws Exception {
        int databaseSizeBeforeTest = pacijentRepository.findAll().size();
        // set the field null
        pacijent.setAdresa(null);

        // Create the Pacijent, which fails.

        restPacijentMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pacijent)))
            .andExpect(status().isBadRequest());

        List<Pacijent> pacijentList = pacijentRepository.findAll();
        assertThat(pacijentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkTelefonIsRequired() throws Exception {
        int databaseSizeBeforeTest = pacijentRepository.findAll().size();
        // set the field null
        pacijent.setTelefon(null);

        // Create the Pacijent, which fails.

        restPacijentMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pacijent)))
            .andExpect(status().isBadRequest());

        List<Pacijent> pacijentList = pacijentRepository.findAll();
        assertThat(pacijentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkEmailIsRequired() throws Exception {
        int databaseSizeBeforeTest = pacijentRepository.findAll().size();
        // set the field null
        pacijent.setEmail(null);

        // Create the Pacijent, which fails.

        restPacijentMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pacijent)))
            .andExpect(status().isBadRequest());

        List<Pacijent> pacijentList = pacijentRepository.findAll();
        assertThat(pacijentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkDatumRodjenjaIsRequired() throws Exception {
        int databaseSizeBeforeTest = pacijentRepository.findAll().size();
        // set the field null
        pacijent.setDatumRodjenja(null);

        // Create the Pacijent, which fails.

        restPacijentMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pacijent)))
            .andExpect(status().isBadRequest());

        List<Pacijent> pacijentList = pacijentRepository.findAll();
        assertThat(pacijentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllPacijents() throws Exception {
        // Initialize the database
        pacijentRepository.saveAndFlush(pacijent);

        // Get all the pacijentList
        restPacijentMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pacijent.getId().intValue())))
            .andExpect(jsonPath("$.[*].ime").value(hasItem(DEFAULT_IME)))
            .andExpect(jsonPath("$.[*].prezime").value(hasItem(DEFAULT_PREZIME)))
            .andExpect(jsonPath("$.[*].jmbg").value(hasItem(DEFAULT_JMBG)))
            .andExpect(jsonPath("$.[*].adresa").value(hasItem(DEFAULT_ADRESA)))
            .andExpect(jsonPath("$.[*].telefon").value(hasItem(DEFAULT_TELEFON)))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)))
            .andExpect(jsonPath("$.[*].datumRodjenja").value(hasItem(sameInstant(DEFAULT_DATUM_RODJENJA))))
            .andExpect(jsonPath("$.[*].pol").value(hasItem(DEFAULT_POL.toString())));
    }

    @Test
    @Transactional
    void getPacijent() throws Exception {
        // Initialize the database
        pacijentRepository.saveAndFlush(pacijent);

        // Get the pacijent
        restPacijentMockMvc
            .perform(get(ENTITY_API_URL_ID, pacijent.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(pacijent.getId().intValue()))
            .andExpect(jsonPath("$.ime").value(DEFAULT_IME))
            .andExpect(jsonPath("$.prezime").value(DEFAULT_PREZIME))
            .andExpect(jsonPath("$.jmbg").value(DEFAULT_JMBG))
            .andExpect(jsonPath("$.adresa").value(DEFAULT_ADRESA))
            .andExpect(jsonPath("$.telefon").value(DEFAULT_TELEFON))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL))
            .andExpect(jsonPath("$.datumRodjenja").value(sameInstant(DEFAULT_DATUM_RODJENJA)))
            .andExpect(jsonPath("$.pol").value(DEFAULT_POL.toString()));
    }

    @Test
    @Transactional
    void getNonExistingPacijent() throws Exception {
        // Get the pacijent
        restPacijentMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingPacijent() throws Exception {
        // Initialize the database
        pacijentRepository.saveAndFlush(pacijent);

        int databaseSizeBeforeUpdate = pacijentRepository.findAll().size();

        // Update the pacijent
        Pacijent updatedPacijent = pacijentRepository.findById(pacijent.getId()).get();
        // Disconnect from session so that the updates on updatedPacijent are not directly saved in db
        em.detach(updatedPacijent);
        updatedPacijent
            .ime(UPDATED_IME)
            .prezime(UPDATED_PREZIME)
            .jmbg(UPDATED_JMBG)
            .adresa(UPDATED_ADRESA)
            .telefon(UPDATED_TELEFON)
            .email(UPDATED_EMAIL)
            .datumRodjenja(UPDATED_DATUM_RODJENJA)
            .pol(UPDATED_POL);

        restPacijentMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedPacijent.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedPacijent))
            )
            .andExpect(status().isOk());

        // Validate the Pacijent in the database
        List<Pacijent> pacijentList = pacijentRepository.findAll();
        assertThat(pacijentList).hasSize(databaseSizeBeforeUpdate);
        Pacijent testPacijent = pacijentList.get(pacijentList.size() - 1);
        assertThat(testPacijent.getIme()).isEqualTo(UPDATED_IME);
        assertThat(testPacijent.getPrezime()).isEqualTo(UPDATED_PREZIME);
        assertThat(testPacijent.getJmbg()).isEqualTo(UPDATED_JMBG);
        assertThat(testPacijent.getAdresa()).isEqualTo(UPDATED_ADRESA);
        assertThat(testPacijent.getTelefon()).isEqualTo(UPDATED_TELEFON);
        assertThat(testPacijent.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testPacijent.getDatumRodjenja()).isEqualTo(UPDATED_DATUM_RODJENJA);
        assertThat(testPacijent.getPol()).isEqualTo(UPDATED_POL);
    }

    @Test
    @Transactional
    void putNonExistingPacijent() throws Exception {
        int databaseSizeBeforeUpdate = pacijentRepository.findAll().size();
        pacijent.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPacijentMockMvc
            .perform(
                put(ENTITY_API_URL_ID, pacijent.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(pacijent))
            )
            .andExpect(status().isBadRequest());

        // Validate the Pacijent in the database
        List<Pacijent> pacijentList = pacijentRepository.findAll();
        assertThat(pacijentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchPacijent() throws Exception {
        int databaseSizeBeforeUpdate = pacijentRepository.findAll().size();
        pacijent.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPacijentMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(pacijent))
            )
            .andExpect(status().isBadRequest());

        // Validate the Pacijent in the database
        List<Pacijent> pacijentList = pacijentRepository.findAll();
        assertThat(pacijentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamPacijent() throws Exception {
        int databaseSizeBeforeUpdate = pacijentRepository.findAll().size();
        pacijent.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPacijentMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pacijent)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Pacijent in the database
        List<Pacijent> pacijentList = pacijentRepository.findAll();
        assertThat(pacijentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdatePacijentWithPatch() throws Exception {
        // Initialize the database
        pacijentRepository.saveAndFlush(pacijent);

        int databaseSizeBeforeUpdate = pacijentRepository.findAll().size();

        // Update the pacijent using partial update
        Pacijent partialUpdatedPacijent = new Pacijent();
        partialUpdatedPacijent.setId(pacijent.getId());

        partialUpdatedPacijent.ime(UPDATED_IME).pol(UPDATED_POL);

        restPacijentMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPacijent.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPacijent))
            )
            .andExpect(status().isOk());

        // Validate the Pacijent in the database
        List<Pacijent> pacijentList = pacijentRepository.findAll();
        assertThat(pacijentList).hasSize(databaseSizeBeforeUpdate);
        Pacijent testPacijent = pacijentList.get(pacijentList.size() - 1);
        assertThat(testPacijent.getIme()).isEqualTo(UPDATED_IME);
        assertThat(testPacijent.getPrezime()).isEqualTo(DEFAULT_PREZIME);
        assertThat(testPacijent.getJmbg()).isEqualTo(DEFAULT_JMBG);
        assertThat(testPacijent.getAdresa()).isEqualTo(DEFAULT_ADRESA);
        assertThat(testPacijent.getTelefon()).isEqualTo(DEFAULT_TELEFON);
        assertThat(testPacijent.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testPacijent.getDatumRodjenja()).isEqualTo(DEFAULT_DATUM_RODJENJA);
        assertThat(testPacijent.getPol()).isEqualTo(UPDATED_POL);
    }

    @Test
    @Transactional
    void fullUpdatePacijentWithPatch() throws Exception {
        // Initialize the database
        pacijentRepository.saveAndFlush(pacijent);

        int databaseSizeBeforeUpdate = pacijentRepository.findAll().size();

        // Update the pacijent using partial update
        Pacijent partialUpdatedPacijent = new Pacijent();
        partialUpdatedPacijent.setId(pacijent.getId());

        partialUpdatedPacijent
            .ime(UPDATED_IME)
            .prezime(UPDATED_PREZIME)
            .jmbg(UPDATED_JMBG)
            .adresa(UPDATED_ADRESA)
            .telefon(UPDATED_TELEFON)
            .email(UPDATED_EMAIL)
            .datumRodjenja(UPDATED_DATUM_RODJENJA)
            .pol(UPDATED_POL);

        restPacijentMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPacijent.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPacijent))
            )
            .andExpect(status().isOk());

        // Validate the Pacijent in the database
        List<Pacijent> pacijentList = pacijentRepository.findAll();
        assertThat(pacijentList).hasSize(databaseSizeBeforeUpdate);
        Pacijent testPacijent = pacijentList.get(pacijentList.size() - 1);
        assertThat(testPacijent.getIme()).isEqualTo(UPDATED_IME);
        assertThat(testPacijent.getPrezime()).isEqualTo(UPDATED_PREZIME);
        assertThat(testPacijent.getJmbg()).isEqualTo(UPDATED_JMBG);
        assertThat(testPacijent.getAdresa()).isEqualTo(UPDATED_ADRESA);
        assertThat(testPacijent.getTelefon()).isEqualTo(UPDATED_TELEFON);
        assertThat(testPacijent.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testPacijent.getDatumRodjenja()).isEqualTo(UPDATED_DATUM_RODJENJA);
        assertThat(testPacijent.getPol()).isEqualTo(UPDATED_POL);
    }

    @Test
    @Transactional
    void patchNonExistingPacijent() throws Exception {
        int databaseSizeBeforeUpdate = pacijentRepository.findAll().size();
        pacijent.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPacijentMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, pacijent.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(pacijent))
            )
            .andExpect(status().isBadRequest());

        // Validate the Pacijent in the database
        List<Pacijent> pacijentList = pacijentRepository.findAll();
        assertThat(pacijentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchPacijent() throws Exception {
        int databaseSizeBeforeUpdate = pacijentRepository.findAll().size();
        pacijent.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPacijentMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(pacijent))
            )
            .andExpect(status().isBadRequest());

        // Validate the Pacijent in the database
        List<Pacijent> pacijentList = pacijentRepository.findAll();
        assertThat(pacijentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamPacijent() throws Exception {
        int databaseSizeBeforeUpdate = pacijentRepository.findAll().size();
        pacijent.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPacijentMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(pacijent)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Pacijent in the database
        List<Pacijent> pacijentList = pacijentRepository.findAll();
        assertThat(pacijentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deletePacijent() throws Exception {
        // Initialize the database
        pacijentRepository.saveAndFlush(pacijent);

        int databaseSizeBeforeDelete = pacijentRepository.findAll().size();

        // Delete the pacijent
        restPacijentMockMvc
            .perform(delete(ENTITY_API_URL_ID, pacijent.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Pacijent> pacijentList = pacijentRepository.findAll();
        assertThat(pacijentList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
