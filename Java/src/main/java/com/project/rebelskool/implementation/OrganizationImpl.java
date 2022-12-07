package com.project.rebelskool.implementation;
import com.project.rebelskool.entity.Organization;
import com.project.rebelskool.repo.OrganizationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class OrganizationImpl  {

    public List<Organization> getOrganizationDetails(List<Organization> OrganizationDetails) throws IOExceptio{
        if (OrganizationDetails.size() > 0 ) {
            OrganizationDetails.forEach(
                    (temp) -> {
                        System.out.println(temp);
                        temp.organizationname = temp.organizationname + " - INDIA";
                    });
        }
        return OrganizationDetails;
    }

}
