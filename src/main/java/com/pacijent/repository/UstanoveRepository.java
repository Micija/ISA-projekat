package com.pacijent.repository;

import com.pacijent.domain.Ustanove;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Ustanove entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UstanoveRepository extends JpaRepository<Ustanove, Long> {}
