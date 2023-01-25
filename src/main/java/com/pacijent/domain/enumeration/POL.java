package com.pacijent.domain.enumeration;

/**
 * The POL enumeration.
 */
public enum POL {
    MUSKO("Muško"),
    ZENSKO("Žensko");

    private final String value;

    POL(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
