package com.pacijent.web.rest;

import com.pacijent.domain.Pregled;
import com.pacijent.repository.PregledRepository;
import com.pacijent.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
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
 * REST controller for managing {@link com.pacijent.domain.Pregled}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PregledResource {

    private final Logger log = LoggerFactory.getLogger(PregledResource.class);

    private static final String ENTITY_NAME = "pregled";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PregledRepository pregledRepository;

    public PregledResource(PregledRepository pregledRepository) {
        this.pregledRepository = pregledRepository;
    }

    /**
     * {@code POST  /pregleds} : Create a new pregled.
     *
     * @param pregled the pregled to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new pregled, or with status {@code 400 (Bad Request)} if the pregled has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/pregleds")
    public ResponseEntity<Pregled> createPregled(@Valid @RequestBody Pregled pregled) throws URISyntaxException {
        log.debug("REST request to save Pregled : {}", pregled);
        if (pregled.getId() != null) {
            throw new BadRequestAlertException("A new pregled cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Pregled result = pregledRepository.save(pregled);
        return ResponseEntity
            .created(new URI("/api/pregleds/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /pregleds/:id} : Updates an existing pregled.
     *
     * @param id the id of the pregled to save.
     * @param pregled the pregled to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated pregled,
     * or with status {@code 400 (Bad Request)} if the pregled is not valid,
     * or with status {@code 500 (Internal Server Error)} if the pregled couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/pregleds/{id}")
    public ResponseEntity<Pregled> updatePregled(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Pregled pregled
    ) throws URISyntaxException {
        log.debug("REST request to update Pregled : {}, {}", id, pregled);
        if (pregled.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, pregled.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!pregledRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Pregled result = pregledRepository.save(pregled);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, pregled.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /pregleds/:id} : Partial updates given fields of an existing pregled, field will ignore if it is null
     *
     * @param id the id of the pregled to save.
     * @param pregled the pregled to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated pregled,
     * or with status {@code 400 (Bad Request)} if the pregled is not valid,
     * or with status {@code 404 (Not Found)} if the pregled is not found,
     * or with status {@code 500 (Internal Server Error)} if the pregled couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/pregleds/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Pregled> partialUpdatePregled(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Pregled pregled
    ) throws URISyntaxException {
        log.debug("REST request to partial update Pregled partially : {}, {}", id, pregled);
        if (pregled.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, pregled.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!pregledRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Pregled> result = pregledRepository
            .findById(pregled.getId())
            .map(existingPregled -> {
                if (pregled.getIme() != null) {
                    existingPregled.setIme(pregled.getIme());
                }
                if (pregled.getTip() != null) {
                    existingPregled.setTip(pregled.getTip());
                }

                return existingPregled;
            })
            .map(pregledRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, pregled.getId().toString())
        );
    }

    /**
     * {@code GET  /pregleds} : get all the pregleds.
     *
     * @param pageable the pagination information.
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of pregleds in body.
     */
    @GetMapping("/pregleds")
    public ResponseEntity<List<Pregled>> getAllPregleds(
        @org.springdoc.api.annotations.ParameterObject Pageable pageable,
        @RequestParam(required = false) String filter,
        @RequestParam(required = false, defaultValue = "false") boolean eagerload
    ) {
        if ("ustanove-is-null".equals(filter)) {
            log.debug("REST request to get all Pregleds where ustanove is null");
            return new ResponseEntity<>(
                StreamSupport
                    .stream(pregledRepository.findAll().spliterator(), false)
                    .filter(pregled -> pregled.getUstanove() == null)
                    .collect(Collectors.toList()),
                HttpStatus.OK
            );
        }
        log.debug("REST request to get a page of Pregleds");
        Page<Pregled> page;
        if (eagerload) {
            page = pregledRepository.findAllWithEagerRelationships(pageable);
        } else {
            page = pregledRepository.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /pregleds/:id} : get the "id" pregled.
     *
     * @param id the id of the pregled to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the pregled, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/pregleds/{id}")
    public ResponseEntity<Pregled> getPregled(@PathVariable Long id) {
        log.debug("REST request to get Pregled : {}", id);
        Optional<Pregled> pregled = pregledRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(pregled);
    }

    /**
     * {@code DELETE  /pregleds/:id} : delete the "id" pregled.
     *
     * @param id the id of the pregled to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/pregleds/{id}")
    public ResponseEntity<Void> deletePregled(@PathVariable Long id) {
        log.debug("REST request to delete Pregled : {}", id);
        pregledRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
