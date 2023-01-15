package com.pacijent.web.rest;

import com.pacijent.domain.Ustanove;
import com.pacijent.repository.UstanoveRepository;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.pacijent.domain.Ustanove}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class UstanoveResource {

    private final Logger log = LoggerFactory.getLogger(UstanoveResource.class);

    private static final String ENTITY_NAME = "ustanove";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UstanoveRepository ustanoveRepository;

    public UstanoveResource(UstanoveRepository ustanoveRepository) {
        this.ustanoveRepository = ustanoveRepository;
    }

    /**
     * {@code POST  /ustanoves} : Create a new ustanove.
     *
     * @param ustanove the ustanove to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ustanove, or with status {@code 400 (Bad Request)} if the ustanove has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ustanoves")
    public ResponseEntity<Ustanove> createUstanove(@Valid @RequestBody Ustanove ustanove) throws URISyntaxException {
        log.debug("REST request to save Ustanove : {}", ustanove);
        if (ustanove.getId() != null) {
            throw new BadRequestAlertException("A new ustanove cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Ustanove result = ustanoveRepository.save(ustanove);
        return ResponseEntity
            .created(new URI("/api/ustanoves/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ustanoves/:id} : Updates an existing ustanove.
     *
     * @param id the id of the ustanove to save.
     * @param ustanove the ustanove to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ustanove,
     * or with status {@code 400 (Bad Request)} if the ustanove is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ustanove couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ustanoves/{id}")
    public ResponseEntity<Ustanove> updateUstanove(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Ustanove ustanove
    ) throws URISyntaxException {
        log.debug("REST request to update Ustanove : {}, {}", id, ustanove);
        if (ustanove.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, ustanove.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!ustanoveRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Ustanove result = ustanoveRepository.save(ustanove);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, ustanove.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /ustanoves/:id} : Partial updates given fields of an existing ustanove, field will ignore if it is null
     *
     * @param id the id of the ustanove to save.
     * @param ustanove the ustanove to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ustanove,
     * or with status {@code 400 (Bad Request)} if the ustanove is not valid,
     * or with status {@code 404 (Not Found)} if the ustanove is not found,
     * or with status {@code 500 (Internal Server Error)} if the ustanove couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/ustanoves/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Ustanove> partialUpdateUstanove(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Ustanove ustanove
    ) throws URISyntaxException {
        log.debug("REST request to partial update Ustanove partially : {}, {}", id, ustanove);
        if (ustanove.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, ustanove.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!ustanoveRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Ustanove> result = ustanoveRepository
            .findById(ustanove.getId())
            .map(existingUstanove -> {
                if (ustanove.getIme() != null) {
                    existingUstanove.setIme(ustanove.getIme());
                }

                return existingUstanove;
            })
            .map(ustanoveRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, ustanove.getId().toString())
        );
    }

    /**
     * {@code GET  /ustanoves} : get all the ustanoves.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ustanoves in body.
     */
    @GetMapping("/ustanoves")
    public ResponseEntity<List<Ustanove>> getAllUstanoves(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of Ustanoves");
        Page<Ustanove> page = ustanoveRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /ustanoves/:id} : get the "id" ustanove.
     *
     * @param id the id of the ustanove to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ustanove, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ustanoves/{id}")
    public ResponseEntity<Ustanove> getUstanove(@PathVariable Long id) {
        log.debug("REST request to get Ustanove : {}", id);
        Optional<Ustanove> ustanove = ustanoveRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ustanove);
    }

    /**
     * {@code DELETE  /ustanoves/:id} : delete the "id" ustanove.
     *
     * @param id the id of the ustanove to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ustanoves/{id}")
    public ResponseEntity<Void> deleteUstanove(@PathVariable Long id) {
        log.debug("REST request to delete Ustanove : {}", id);
        ustanoveRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
