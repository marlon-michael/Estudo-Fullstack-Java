package com.entra21.springproject.model.dto;

import lombok.Data;

@Data
public class ItemListagemDTO {
    public Long id;
    public String titulo;
    public Boolean emprestado;
    public String tipo;
}