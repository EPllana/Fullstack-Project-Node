export const API_BASE_URL = "http://192.168.1.5:3000"; 


// File: src/types.ts
export type Trip = {
id: string;
title: string;
description?: string;
price?: number;
imageUrl?: string;
};


export type User = {
id: string;
name: string;
email: string;
};