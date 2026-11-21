package com.example.inventory.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.inventory.model.Product;

@Mapper
public interface ProductMapper {
	
	List<Product> findAll();
	
	Product findById(Long id);
	
	int insert(Product product);
	
	int update(Product product);
	
	int deleteById(Long id);
}
