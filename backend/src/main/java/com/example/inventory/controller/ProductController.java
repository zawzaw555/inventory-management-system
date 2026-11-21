package com.example.inventory.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.inventory.model.Product;
import com.example.inventory.service.ProductService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {
	
	private final ProductService productService;
	
	@GetMapping
	public List<Product> getProducts() {
		return productService.getAllProducts();
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Product> getProduct(
			@PathVariable Long id) {
		
		Product product = productService.getProductById(id);
		
		if (product == null) {
			return ResponseEntity.notFound().build();
		}
		
		return ResponseEntity.ok(product);
		
	}
	
	@PostMapping
	public ResponseEntity<Product> createProduct(
			@RequestBody Product product) {
		
		Product created = productService.createProduct(product);
		
		return ResponseEntity.status(HttpStatus.CREATED).body(created);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Void> updateProduct(
				@PathVariable Long id,
				@RequestBody Product product) {
		boolean updated = productService.updateProduct(id, product);
		
		return updated
				? ResponseEntity.noContent().build()
				: ResponseEntity.notFound().build();
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteProduct(
				@PathVariable Long id) {
		
		boolean deleted = productService.deleteProduct(id);
		
		return deleted
				? ResponseEntity.noContent().build()
				: ResponseEntity.notFound().build();
	}
}
