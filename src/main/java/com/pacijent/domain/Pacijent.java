package com.pacijent.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.pacijent.domain.enumeration.POL;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Pacijent.
 */
@Entity
@Table(name = "pacijent")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Pacijent implements Serializable {

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
    @Column(name = "prezime", nullable = false)
    private String prezime;

    @NotNull
    @Size(min = 13, max = 13)
    @Column(name = "jmbg", length = 13, nullable = false)
    private String jmbg;

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

    @NotNull
    @Column(name = "datum_rodjenja", nullable = false)
    private ZonedDateTime datumRodjenja;

    @Enumerated(EnumType.STRING)
    @Column(name = "pol")
    private POL pol;

    @OneToMany(mappedBy = "pacijent")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "pacijent", "ustanove" }, allowSetters = true)
    private Set<Pregled> pregleds = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Pacijent id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIme() {
        return this.ime;
    }

    public Pacijent ime(String ime) {
        this.setIme(ime);
        return this;
    }

    public void setIme(String ime) {
        this.ime = ime;
    }

    public String getPrezime() {
        return this.prezime;
    }

    public Pacijent prezime(String prezime) {
        this.setPrezime(prezime);
        return this;
    }

    public void setPrezime(String prezime) {
        this.prezime = prezime;
    }

    public String getJmbg() {
        return this.jmbg;
    }

    public Pacijent jmbg(String jmbg) {
        this.setJmbg(jmbg);
        return this;
    }

    public void setJmbg(String jmbg) {
        this.jmbg = jmbg;
    }

    public String getAdresa() {
        return this.adresa;
    }

    public Pacijent adresa(String adresa) {
        this.setAdresa(adresa);
        return this;
    }

    public void setAdresa(String adresa) {
        this.adresa = adresa;
    }

    public String getTelefon() {
        return this.telefon;
    }

    public Pacijent telefon(String telefon) {
        this.setTelefon(telefon);
        return this;
    }

    public void setTelefon(String telefon) {
        this.telefon = telefon;
    }

    public String getEmail() {
        return this.email;
    }

    public Pacijent email(String email) {
        this.setEmail(email);
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public ZonedDateTime getDatumRodjenja() {
        return this.datumRodjenja;
    }

    public Pacijent datumRodjenja(ZonedDateTime datumRodjenja) {
        this.setDatumRodjenja(datumRodjenja);
        return this;
    }

    public void setDatumRodjenja(ZonedDateTime datumRodjenja) {
        this.datumRodjenja = datumRodjenja;
    }

    public POL getPol() {
        return this.pol;
    }

    public Pacijent pol(POL pol) {
        this.setPol(pol);
        return this;
    }

    public void setPol(POL pol) {
        this.pol = pol;
    }

    public Set<Pregled> getPregleds() {
        return this.pregleds;
    }

    public void setPregleds(Set<Pregled> pregleds) {
        if (this.pregleds != null) {
            this.pregleds.forEach(i -> i.setPacijent(null));
        }
        if (pregleds != null) {
            pregleds.forEach(i -> i.setPacijent(this));
        }
        this.pregleds = pregleds;
    }

    public Pacijent pregleds(Set<Pregled> pregleds) {
        this.setPregleds(pregleds);
        return this;
    }

    public Pacijent addPregled(Pregled pregled) {
        this.pregleds.add(pregled);
        pregled.setPacijent(this);
        return this;
    }

    public Pacijent removePregled(Pregled pregled) {
        this.pregleds.remove(pregled);
        pregled.setPacijent(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Pacijent)) {
            return false;
        }
        return id != null && id.equals(((Pacijent) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Pacijent{" +
            "id=" + getId() +
            ", ime='" + getIme() + "'" +
            ", prezime='" + getPrezime() + "'" +
            ", jmbg='" + getJmbg() + "'" +
            ", adresa='" + getAdresa() + "'" +
            ", telefon='" + getTelefon() + "'" +
            ", email='" + getEmail() + "'" +
            ", datumRodjenja='" + getDatumRodjenja() + "'" +
            ", pol='" + getPol() + "'" +
            "}";
    }
}
