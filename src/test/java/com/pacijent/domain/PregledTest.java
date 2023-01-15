package com.pacijent.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.pacijent.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class PregledTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Pregled.class);
        Pregled pregled1 = new Pregled();
        pregled1.setId(1L);
        Pregled pregled2 = new Pregled();
        pregled2.setId(pregled1.getId());
        assertThat(pregled1).isEqualTo(pregled2);
        pregled2.setId(2L);
        assertThat(pregled1).isNotEqualTo(pregled2);
        pregled1.setId(null);
        assertThat(pregled1).isNotEqualTo(pregled2);
    }
}
