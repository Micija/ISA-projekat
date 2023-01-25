package com.pacijent.web.rest;

import com.pacijent.domain.Pacijent;
import com.pacijent.repository.PacijentRepository;
import com.pacijent.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.pacijent.domain.Pacijent}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PacijentResource {

    private final Logger log = LoggerFactory.getLogger(PacijentResource.class);

    private static final String ENTITY_NAME = "pacijent";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PacijentRepository pacijentRepository;

    public PacijentResource(PacijentRepository pacijentRepository) {
        this.pacijentRepository = pacijentRepository;
    }

    /**
     * {@code POST  /pacijents} : Create a new pacijent.
     *
     * @param pacijent the pacijent to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new pacijent, or with status {@code 400 (Bad Request)} if the pacijent has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/pacijents")
    public ResponseEntity<Pacijent> createPacijent(@Valid @RequestBody Pacijent pacijent) throws URISyntaxException {
        log.debug("REST request to save Pacijent : {}", pacijent);
        if (pacijent.getId() != null) {
            throw new BadRequestAlertException("A new pacijent cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Pacijent result = pacijentRepository.save(pacijent);
        return ResponseEntity
            .created(new URI("/api/pacijents/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /pacijents/:id} : Updates an existing pacijent.
     *
     * @param id the id of the pacijent to save.
     * @param pacijent the pacijent to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated pacijent,
     * or with status {@code 400 (Bad Request)} if the pacijent is not valid,
     * or with status {@code 500 (Internal Server Error)} if the pacijent couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/pacijents/{id}")
    public ResponseEntity<Pacijent> updatePacijent(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Pacijent pacijent
    ) throws URISyntaxException {
        log.debug("REST request to update Pacijent : {}, {}", id, pacijent);
        if (pacijent.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, pacijent.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!pacijentRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Pacijent result = pacijentRepository.save(pacijent);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, pacijent.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /pacijents/:id} : Partial updates given fields of an existing pacijent, field will ignore if it is null
     *
     * @param id the id of the pacijent to save.
     * @param pacijent the pacijent to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated pacijent,
     * or with status {@code 400 (Bad Request)} if the pacijent is not valid,
     * or with status {@code 404 (Not Found)} if the pacijent is not found,
     * or with status {@code 500 (Internal Server Error)} if the pacijent couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/pacijents/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Pacijent> partialUpdatePacijent(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Pacijent pacijent
    ) throws URISyntaxException {
        log.debug("REST request to partial update Pacijent partially : {}, {}", id, pacijent);
        if (pacijent.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, pacijent.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!pacijentRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Pacijent> result = pacijentRepository
            .findById(pacijent.getId())
            .map(existingPacijent -> {
                if (pacijent.getIme() != null) {
                    existingPacijent.setIme(pacijent.getIme());
                }
                if (pacijent.getPrezime() != null) {
                    existingPacijent.setPrezime(pacijent.getPrezime());
                }
                if (pacijent.getJmbg() != null) {
                    existingPacijent.setJmbg(pacijent.getJmbg());
                }
                if (pacijent.getAdresa() != null) {
                    existingPacijent.setAdresa(pacijent.getAdresa());
                }
                if (pacijent.getTelefon() != null) {
                    existingPacijent.setTelefon(pacijent.getTelefon());
                }
                if (pacijent.getEmail() != null) {
                    existingPacijent.setEmail(pacijent.getEmail());
                }
                if (pacijent.getDatumRodjenja() != null) {
                    existingPacijent.setDatumRodjenja(pacijent.getDatumRodjenja());
                }
                if (pacijent.getPol() != null) {
                    existingPacijent.setPol(pacijent.getPol());
                }

                return existingPacijent;
            })
            .map(pacijentRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, pacijent.getId().toString())
        );
    }

    /**
     * {@code GET  /pacijents} : get all the pacijents.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of pacijents in body.
     */
    @GetMapping("/pacijents")
    public List<Pacijent> getAllPacijents() {
        log.debug("REST request to get all Pacijents");
        return pacijentRepository.findAll();
    }

    /**
     * {@code GET  /pacijents/:id} : get the "id" pacijent.
     *
     * @param id the id of the pacijent to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the pacijent, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/pacijents/{id}")
    public ResponseEntity<Pacijent> getPacijent(@PathVariable Long id) {
        log.debug("REST request to get Pacijent : {}", id);
        Optional<Pacijent> pacijent = pacijentRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(pacijent);
    }

    /**
     * {@code DELETE  /pacijents/:id} : delete the "id" pacijent.
     *
     * @param id the id of the pacijent to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/pacijents/{id}")
    public ResponseEntity<Void> deletePacijent(@PathVariable Long id) {
        log.debug("REST request to delete Pacijent : {}", id);
        pacijentRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
