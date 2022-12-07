package com.project.rebelskool;

import com.project.rebelskool.entity.Organization;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import java.util.List;

@SpringBootApplication
public class RebelSkoolStarter implements CommandLineRunner {

    @Autowired
    private JdbcTemplate jdbcTemplate;
    public  static  void  main (String[] args){
        SpringApplication.run(RebelSkoolStarter.class,args);

    }

    @Override
    public void run(String... strings) throws Exception {
        String sql="select * from rebelskoolorganization;";
        List<Organization> organization = jdbcTemplate.query(sql, BeanPropertyRowMapper.newInstance(Organization.class));

        organization.forEach(System.out :: println);

    }
}
