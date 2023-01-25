package com.pacijent.repository;

import com.pacijent.domain.Pregled;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Pregled entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PregledRepository extends JpaRepository<Pregled, Long> {}
