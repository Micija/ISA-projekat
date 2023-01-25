package com.pacijent.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
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

    @NotNull
    @Size(min = 3)
    @Column(name = "adresa", nullable = false)
    private String adresa;

    @NotNull
    @Size(min = 9, max = 9)
    @Column(name = "telefon", length = 9, nullable = false)
    private String telefon;

    @NotNull
    @Size(min = 3)
    @Column(name = "email", nullable = false)
    private String email;

    @OneToMany(mappedBy = "ustanove")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "pacijent", "ustanove" }, allowSetters = true)
    private Set<Pregled> pregleds = new HashSet<>();

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

    public String getAdresa() {
        return this.adresa;
    }

    public Ustanove adresa(String adresa) {
        this.setAdresa(adresa);
        return this;
    }

    public void setAdresa(String adresa) {
        this.adresa = adresa;
    }

    public String getTelefon() {
        return this.telefon;
    }

    public Ustanove telefon(String telefon) {
        this.setTelefon(telefon);
        return this;
    }

    public void setTelefon(String telefon) {
        this.telefon = telefon;
    }

    public String getEmail() {
        return this.email;
    }

    public Ustanove email(String email) {
        this.setEmail(email);
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Set<Pregled> getPregleds() {
        return this.pregleds;
    }

    public void setPregleds(Set<Pregled> pregleds) {
        if (this.pregleds != null) {
            this.pregleds.forEach(i -> i.setUstanove(null));
        }
        if (pregleds != null) {
            pregleds.forEach(i -> i.setUstanove(this));
        }
        this.pregleds = pregleds;
    }

    public Ustanove pregleds(Set<Pregled> pregleds) {
        this.setPregleds(pregleds);
        return this;
    }

    public Ustanove addPregled(Pregled pregled) {
        this.pregleds.add(pregled);
        pregled.setUstanove(this);
        return this;
    }

    public Ustanove removePregled(Pregled pregled) {
        this.pregleds.remove(pregled);
        pregled.setUstanove(null);
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
            ", adresa='" + getAdresa() + "'" +
            ", telefon='" + getTelefon() + "'" +
            ", email='" + getEmail() + "'" +
            "}";
    }
}
