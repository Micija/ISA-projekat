package com.pacijent.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Ustanove.
 */
@Entity
@Table(name = "ustanove")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Ustanove implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(min = 3)
    @Column(name = "ime", nullable = false)
    private String ime;

    @JsonIgnoreProperties(value = { "user", "ustanove" }, allowSetters = true)
    @OneToOne
    @JoinColumn(unique = true)
    private Pregled pregled;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Ustanove id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIme() {
        return this.ime;
    }

    public Ustanove ime(String ime) {
        this.setIme(ime);
        return this;
    }

    public void setIme(String ime) {
        this.ime = ime;
    }

    public Pregled getPregled() {
        return this.pregled;
    }

    public void setPregled(Pregled pregled) {
        this.pregled = pregled;
    }

    public Ustanove pregled(Pregled pregled) {
        this.setPregled(pregled);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Ustanove)) {
            return false;
        }
        return id != null && id.equals(((Ustanove) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Ustanove{" +
            "id=" + getId() +
            ", ime='" + getIme() + "'" +
            "}";
    }
}
