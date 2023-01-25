package com.pacijent.repository;

import com.pacijent.domain.Pacijent;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Pacijent entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PacijentRepository extends JpaRepository<Pacijent, Long> {}
