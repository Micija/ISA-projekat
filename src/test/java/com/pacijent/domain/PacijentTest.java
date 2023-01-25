package com.pacijent.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.pacijent.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class PacijentTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Pacijent.class);
        Pacijent pacijent1 = new Pacijent();
        pacijent1.setId(1L);
        Pacijent pacijent2 = new Pacijent();
        pacijent2.setId(pacijent1.getId());
        assertThat(pacijent1).isEqualTo(pacijent2);
        pacijent2.setId(2L);
        assertThat(pacijent1).isNotEqualTo(pacijent2);
        pacijent1.setId(null);
        assertThat(pacijent1).isNotEqualTo(pacijent2);
    }
}
