package com.example.inventory.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.inventory.mapper.ProductMapper;
import com.example.inventory.model.Product;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductService {
	
	private final ProductMapper productMapper;
	
	public List<Product> getAllProducts() {
		return productMapper.findAll();
	}
	
	public Product getProductById(Long id) {
		return productMapper.findById(id);
	}
	
	public Product createProduct(Product product) {
		productMapper.insert(product);
		return productMapper.findById(product.getId());
	}
	
	public boolean updateProduct(Long id, Product product) {
		if (productMapper.findById(id) == null) {
			return false;
		}
		
		product.setId(id);
		return productMapper.update(product) > 0;
	}
	
	public boolean deleteProduct(Long id) {
		return productMapper.deleteById(id) > 0;
	}
}
