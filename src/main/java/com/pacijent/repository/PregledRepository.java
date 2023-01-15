package com.pacijent.repository;

import com.pacijent.domain.Pregled;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Pregled entity.
 */
@Repository
public interface PregledRepository extends JpaRepository<Pregled, Long> {
    @Query("select pregled from Pregled pregled where pregled.user.login = ?#{principal.username}")
    List<Pregled> findByUserIsCurrentUser();

    default Optional<Pregled> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Pregled> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Pregled> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct pregled from Pregled pregled left join fetch pregled.user",
        countQuery = "select count(distinct pregled) from Pregled pregled"
    )
    Page<Pregled> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct pregled from Pregled pregled left join fetch pregled.user")
    List<Pregled> findAllWithToOneRelationships();

    @Query("select pregled from Pregled pregled left join fetch pregled.user where pregled.id =:id")
    Optional<Pregled> findOneWithToOneRelationships(@Param("id") Long id);
}
