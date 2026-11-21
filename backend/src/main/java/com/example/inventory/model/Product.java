package com.example.inventory.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.Data;

@Data
public class Product {
	private Long id;
	private String name;
	private String sku;
	private BigDecimal price;
	private Long categoryId;
	private Integer stockQuantity;
	private LocalDateTime createdAt;
}
