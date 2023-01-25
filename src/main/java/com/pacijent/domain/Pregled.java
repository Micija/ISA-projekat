package com.pacijent.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.pacijent.domain.enumeration.TIP;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Pregled.
 */
@Entity
@Table(name = "pregled")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Pregled implements Serializable {

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

    @Enumerated(EnumType.STRING)
    @Column(name = "tip")
    private TIP tip;

    @ManyToOne
    @JsonIgnoreProperties(value = { "pregleds" }, allowSetters = true)
    private Pacijent pacijent;

    @ManyToOne
    @JsonIgnoreProperties(value = { "pregleds" }, allowSetters = true)
    private Ustanove ustanove;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Pregled id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIme() {
        return this.ime;
    }

    public Pregled ime(String ime) {
        this.setIme(ime);
        return this;
    }

    public void setIme(String ime) {
        this.ime = ime;
    }

    public TIP getTip() {
        return this.tip;
    }

    public Pregled tip(TIP tip) {
        this.setTip(tip);
        return this;
    }

    public void setTip(TIP tip) {
        this.tip = tip;
    }

    public Pacijent getPacijent() {
        return this.pacijent;
    }

    public void setPacijent(Pacijent pacijent) {
        this.pacijent = pacijent;
    }

    public Pregled pacijent(Pacijent pacijent) {
        this.setPacijent(pacijent);
        return this;
    }

    public Ustanove getUstanove() {
        return this.ustanove;
    }

    public void setUstanove(Ustanove ustanove) {
        this.ustanove = ustanove;
    }

    public Pregled ustanove(Ustanove ustanove) {
        this.setUstanove(ustanove);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Pregled)) {
            return false;
        }
        return id != null && id.equals(((Pregled) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Pregled{" +
            "id=" + getId() +
            ", ime='" + getIme() + "'" +
            ", tip='" + getTip() + "'" +
            "}";
    }
}
