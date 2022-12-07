package com.project.rebelskool.controller;

import com.project.rebelskool.entity.Organization;
import com.project.rebelskool.implementation.IOExceptio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


import com.project.rebelskool.entity.Organization;
import com.project.rebelskool.repo.OrganizationRepo;
import com.project.rebelskool.implementation.OrganizationImpl;

@RestController
public class RebelSkoolController implements CommandLineRunner {

//    @RequestMapping(value="/getMsg",method = RequestMethod.GET)
//    public String getMsg(){
//        return "Welcom to RebelSkool";
//    }
@Autowired
private JdbcTemplate jdbcTemplate;

@Autowired
private OrganizationRepo organizationRepo;

@Autowired
private OrganizationImpl organizationImpl;


    @RequestMapping(value="/getOrganizations",method = RequestMethod.GET)
    public List<Organization> getOrganizations(){
        String sql="select * from rebelskoolorganization;";
        List<Organization> organization = jdbcTemplate.query(sql, BeanPropertyRowMapper.newInstance(Organization.class));

        organization.forEach(System.out :: println);
        return organization;
    }

    @Override
    public void run(String... strings) throws Exception {
    }

    @GetMapping("/getOrganizationDetails/{id}")
    public List<Organization> getOrganizationDetailsByIdX (@PathVariable String id) throws IOExceptio {
        List<Organization> organization = new ArrayList<>();
        organization = organizationRepo.getByOrganizationId(id);
        organization = organizationImpl.getOrganizationDetails(organization);
        return organization;
    }

    @PostMapping("/insertOrganization")
    public String insertOrganization (@RequestBody Organization organizationParam) throws IOExceptio {
        organizationRepo.insertOrganization(organizationParam.organizationname , organizationParam.organizationno,
                organizationParam.ceo, organizationParam.phone, organizationParam.address, organizationParam.revenue);
        return "Inserted";
    }


    @GetMapping("/getAllOrganization")
    public List<Organization> getAllOrganization() {
        return organizationRepo.findAll();
    }

}
