package com.pacijent.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.pacijent.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class UstanoveTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Ustanove.class);
        Ustanove ustanove1 = new Ustanove();
        ustanove1.setId(1L);
        Ustanove ustanove2 = new Ustanove();
        ustanove2.setId(ustanove1.getId());
        assertThat(ustanove1).isEqualTo(ustanove2);
        ustanove2.setId(2L);
        assertThat(ustanove1).isNotEqualTo(ustanove2);
        ustanove1.setId(null);
        assertThat(ustanove1).isNotEqualTo(ustanove2);
    }
}
