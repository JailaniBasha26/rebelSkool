package com.project.rebelskool.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@Entity
@Table(name="organization")
@Getter
@Setter
@NoArgsConstructor
public class Organization {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public String organizationname;
    public String organizationno;
    public String ceo;
    public String phone;
    public String address;
    public String revenue;
}
