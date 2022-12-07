package com.project.rebelskool.repo;

import java.io.IOException;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.project.rebelskool.entity.Organization;

import javax.transaction.Transactional;

@Repository
public interface OrganizationRepo extends JpaRepository<Organization, String>{
    @Query(value = "select * from organization  where organizationno=?", nativeQuery = true)
    List<Organization> getByOrganizationId(String organizationNo);

    @Modifying
    @Query(value = "insert into organization Values(?1,?2,?3,?4,?5,?6)", nativeQuery = true)
    @Transactional
   void insertOrganization(String organizationname, String organizationno, String ceo, String phone, String address,
                           String revenue);
}
