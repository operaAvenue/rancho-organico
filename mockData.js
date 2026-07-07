// Rancho Orgânico Mock Database & State Management

window.firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
window.isFirebaseConfigured = window.firebaseConfig.apiKey !== "YOUR_API_KEY";

const DEFAULT_PRODUCTS = [
  { id: "P001", name: "Alface Crespa Orgânica", category: "Verduras", stock: 24, unit: "Maço", cost: 1.8, price: 4.5, expirationDate: "2026-07-28", organicCert: "Certificado", supplierId: "S001", ncm: "0705.11.00", barcode: "7891020304012", imageUrl: "https://images.unsplash.com/photo-1556801712-76c8eb07bbc9?w=400", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { id: "P002", name: "Tomate Cereja Orgânico", category: "Legumes", stock: 15, unit: "Bandeja 250g", cost: 3.2, price: 7.9, expirationDate: "2026-07-29", organicCert: "Certificado", supplierId: "S002", ncm: "0702.00.00", barcode: "7891020304029", imageUrl: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400", videoUrl: "" },
  { id: "P003", name: "Banana Prata Orgânica", category: "Frutas", stock: 40, unit: "800g", cost: 5.4, price: 12, expirationDate: "2026-07-27", organicCert: "Certificado", supplierId: "S001", ncm: "0803.90.00", barcode: "7891020304036", imageUrl: "https://meuquintalorganicos.com.br/assets/products/681d4-banana-prata.jpg", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { id: "P004", name: "Cenoura Orgânica", category: "Legumes, Tubérculos e Raízes", stock: 35, unit: "8 a 10 unid.", cost: 3.83, price: 8.5, expirationDate: "2026-08-02", organicCert: "Certificado", supplierId: "S003", ncm: "0706.10.00", barcode: "7891020304043", imageUrl: "https://meuquintalorganicos.com.br/assets/products/6deed-cenoura.jpg", videoUrl: "" },
  { id: "P005", name: "Mel de Flores Silvestres Orgânico", category: "Mercearia", stock: 12, unit: "Pote 500g", cost: 15, price: 32, expirationDate: "2027-06-01", organicCert: "Certificado", supplierId: "S004", ncm: "0409.00.00", barcode: "7891020304050", imageUrl: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { id: "P006", name: "Morangos Orgânicos", category: "Frutas", stock: 8, unit: "Bandeja 300g", cost: 4.5, price: 9.8, expirationDate: "2026-07-26", organicCert: "Certificado", supplierId: "S002", ncm: "0810.10.00", barcode: "7891020304067", imageUrl: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400", videoUrl: "" },
  { id: "P007", name: "Espinafre Orgânico", category: "Verduras e Ervas", stock: 18, unit: "mç.", cost: 3.04, price: 6.75, expirationDate: "2026-07-28", organicCert: "Em Transição", supplierId: "S001", ncm: "0709.70.00", barcode: "7891020304074", imageUrl: "https://meuquintalorganicos.com.br/assets/products/474b7-espinafre.jpg", videoUrl: "" },
  { id: "P008", name: "Ovos Caipiras Orgânicos", category: "Laticínios & Ovos", stock: 20, unit: "Dúzia", cost: 7, price: 16.5, expirationDate: "2026-08-10", organicCert: "Certificado", supplierId: "S003", ncm: "0407.21.00", barcode: "7891020304081", imageUrl: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=400", videoUrl: "" },
  { id: "P009", name: "Alface Orgânica americana", category: "Verduras e Ervas", stock: 20, unit: "unid.", cost: 2.7, price: 6, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0705.11.00", barcode: "7891020305000", imageUrl: "https://meuquintalorganicos.com.br/assets/products/307e4-americana.jpg", videoUrl: "" },
  { id: "P010", name: "Alface Orgânica crespa", category: "Verduras e Ervas", stock: 20, unit: "unid.", cost: 2.7, price: 6, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0705.11.00", barcode: "7891020305001", imageUrl: "https://meuquintalorganicos.com.br/assets/products/daf18-crespa.jpg", videoUrl: "" },
  { id: "P011", name: "Couve Orgânica", category: "Verduras e Ervas", stock: 20, unit: "mç", cost: 3.15, price: 7, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0704.10.00", barcode: "7891020305002", imageUrl: "https://meuquintalorganicos.com.br/assets/products/31722-couve.jpg", videoUrl: "" },
  { id: "P012", name: "Almeirão Orgânico", category: "Verduras e Ervas", stock: 20, unit: "mç", cost: 2.7, price: 6, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305003", imageUrl: "https://meuquintalorganicos.com.br/assets/products/1af7d-almeira.jpg", videoUrl: "" },
  { id: "P013", name: "Cheiro-verde Orgânico", category: "Verduras e Ervas", stock: 20, unit: "mç", cost: 2.81, price: 6.25, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305004", imageUrl: "https://meuquintalorganicos.com.br/assets/products/2eeb1-cheiro.jpg", videoUrl: "" },
  { id: "P014", name: "Manjericão fresco Orgânico", category: "Verduras e Ervas", stock: 20, unit: "mç", cost: 2.7, price: 6, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305005", imageUrl: "https://meuquintalorganicos.com.br/assets/products/e0eac-manjericao.jpg", videoUrl: "" },
  { id: "P015", name: "Escarola Orgânico", category: "Verduras e Ervas", stock: 20, unit: "unid.", cost: 2.7, price: 6, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305007", imageUrl: "https://meuquintalorganicos.com.br/assets/products/361bb-escarola.jpg", videoUrl: "" },
  { id: "P016", name: "Repolho Orgânico Verde", category: "Verduras e Ervas", stock: 20, unit: "unid.", cost: 4.5, price: 10, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305008", imageUrl: "https://meuquintalorganicos.com.br/assets/products/04777-repolhos.jpg", videoUrl: "" },
  { id: "P017", name: "Ora pro nóbis Orgânico", category: "Verduras e Ervas", stock: 20, unit: "Pct. 30 folhas", cost: 2.25, price: 5, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305009", imageUrl: "https://meuquintalorganicos.com.br/assets/products/9d8ba-2d040f70-368e-4878-adb8-0bb6a2f68e8a.jpeg", videoUrl: "" },
  { id: "P018", name: "Acelga Orgânica", category: "Verduras e Ervas", stock: 20, unit: "Unid", cost: 4.05, price: 9, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305010", imageUrl: "https://meuquintalorganicos.com.br/assets/products/0f0e6-2b48413a-6039-46fb-be1c-af1a373dbc36.jpeg", videoUrl: "" },
  { id: "P019", name: "Radicchio Orgânico Italiano", category: "Verduras e Ervas", stock: 20, unit: "bdj. 250g", cost: 4.5, price: 10, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305011", imageUrl: "https://meuquintalorganicos.com.br/assets/products/89c87-radicchio-italiano-organico.jpg", videoUrl: "" },
  { id: "P020", name: "Arroz Agulha Orgânico Branco - Volkmann", category: "Cereais e Farináceos", stock: 20, unit: "1kg vácuo", cost: 9, price: 20, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305012", imageUrl: "https://meuquintalorganicos.com.br/assets/products/de8ee-agulinha-plido.jpg", videoUrl: "" },
  { id: "P021", name: "Arroz Agulha Orgânico Integral - Volkmann", category: "Cereais e Farináceos", stock: 20, unit: "1kg vácuo", cost: 9, price: 20, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305013", imageUrl: "https://meuquintalorganicos.com.br/assets/products/a4c3c-agulhinha-integral.jpg", videoUrl: "" },
  { id: "P022", name: "Arroz Cateto Orgânico Integral - Volkmann", category: "Cereais e Farináceos", stock: 20, unit: "1kg vácuo", cost: 11.25, price: 25, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305014", imageUrl: "https://meuquintalorganicos.com.br/assets/products/14460-catetointegral.jpg", videoUrl: "" },
  { id: "P023", name: "Farinha de Arroz Orgânico Integral - Volkmann", category: "Cereais e Farináceos", stock: 20, unit: "850g vácuo", cost: 7.2, price: 16, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305015", imageUrl: "https://meuquintalorganicos.com.br/assets/products/34e2b-farinha_arroz_integral-organico-biodinamica-volkmann-medium.jpg", videoUrl: "" },
  { id: "P024", name: "Arroz Cateto Orgânico Int. c/ vermelho - Volkmann", category: "Cereais e Farináceos", stock: 20, unit: "1kg vácuo", cost: 12.15, price: 27, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0409.00.00", barcode: "7891020305016", imageUrl: "https://meuquintalorganicos.com.br/assets/products/559fd-cateto-vermelho.jpg", videoUrl: "" },
  { id: "P025", name: "Arroz Exótico Orgânico Negro - Volkmann", category: "Cereais e Farináceos", stock: 20, unit: "250g vácuo", cost: 15.75, price: 35, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305017", imageUrl: "https://meuquintalorganicos.com.br/assets/products/58b22-preto.jpg", videoUrl: "" },
  { id: "P026", name: "Arroz Cateto Org. Integr. Verm. e Negro - Volkmann", category: "Cereais e Farináceos", stock: 20, unit: "250g vácuo", cost: 12.6, price: 28, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305018", imageUrl: "https://meuquintalorganicos.com.br/assets/products/025ae-arroz-cateto-tres-cores-volkmann.png", videoUrl: "" },
  { id: "P027", name: "Arroz Cateto Orgânico Branco - Volkmann", category: "Cereais e Farináceos", stock: 20, unit: "1kg vácuo", cost: 11.25, price: 25, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305019", imageUrl: "https://meuquintalorganicos.com.br/assets/products/a62e1-catetopolido.jpg", videoUrl: "" },
  { id: "P028", name: "Farinha de Milho Flocada Orgânico", category: "Cereais e Farináceos", stock: 20, unit: "Pct. 500g", cost: 7.2, price: 16, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305020", imageUrl: "https://meuquintalorganicos.com.br/assets/products/825ec-d7d0f481-ef4e-46da-a987-8dc5c04f3d00.jpeg", videoUrl: "" },
  { id: "P029", name: "Milho Pipoca Orgânico", category: "Cereais e Farináceos", stock: 20, unit: "Pct. 500g", cost: 7.65, price: 17, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305021", imageUrl: "https://meuquintalorganicos.com.br/assets/products/71d20-bfd4bbc8-7c03-4445-b16f-b81cc9a17b7e.jpeg", videoUrl: "" },
  { id: "P030", name: "Farinha de trigo branca - biorgânica", category: "Cereais e Farináceos", stock: 20, unit: "Saco 1,75kg", cost: 12.15, price: 27, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305022", imageUrl: "https://meuquintalorganicos.com.br/assets/products/9e59f-7d71477a-fa68-44df-8596-986ebd5dbe10.jpeg", videoUrl: "" },
  { id: "P031", name: "Cereal Matinal Orgânico s/açúcar - Mano Velho", category: "Cereais e Farináceos", stock: 20, unit: "200g", cost: 8.55, price: 19, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305023", imageUrl: "https://meuquintalorganicos.com.br/assets/products/5bd07-0931229f-2d82-42d2-9de6-3648cf41938e.jpeg", videoUrl: "" },
  { id: "P032", name: "Bolacha Orgânica de Arroz - Sábia Org.", category: "Cereais e Farináceos", stock: 20, unit: "Pct. 120g", cost: 8.55, price: 19, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305024", imageUrl: "https://meuquintalorganicos.com.br/assets/products/1811c-49716b79-35e8-4b23-90a1-4990689e6c4d.jpeg", videoUrl: "" },
  { id: "P033", name: "Polvilho Azedo Orgânico - Biorganica", category: "Cereais e Farináceos", stock: 20, unit: "pct.500g", cost: 6.3, price: 14, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305025", imageUrl: "https://meuquintalorganicos.com.br/assets/products/6da1d-polvilho-organica-biorganica.jpg", videoUrl: "" },
  { id: "P034", name: "Milho Pipoca - Biorganica", category: "Cereais e Farináceos", stock: 20, unit: "pct.500g", cost: 7.2, price: 16, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305026", imageUrl: "https://meuquintalorganicos.com.br/assets/products/57a73-milho-pipoca-organica-biorganica.jpg", videoUrl: "" },
  { id: "P035", name: "Farinha de Mandioca Torrada Orgânica - Alvorada", category: "Cereais e Farináceos", stock: 20, unit: "pct.500g", cost: 8.55, price: 19, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305027", imageUrl: "https://meuquintalorganicos.com.br/assets/products/64a8c-farinha-de-mandioca-torrada-alvorada.jpg", videoUrl: "" },
  { id: "P036", name: "Polvilho Orgânico - Alvorada", category: "Cereais e Farináceos", stock: 20, unit: "pct.1kg", cost: 15.3, price: 34, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305028", imageUrl: "https://meuquintalorganicos.com.br/assets/products/4bdca-polvilho-organico-alvorada.jpg", videoUrl: "" },
  { id: "P037", name: "Gergelim Branco Orgânico - Alvorada", category: "Cereais e Farináceos", stock: 20, unit: "200g", cost: 13.5, price: 30, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305029", imageUrl: "https://meuquintalorganicos.com.br/assets/products/f364f-gergelim-alvorada-organico.jpg", videoUrl: "" },
  { id: "P038", name: "Farinha Torrada Orgânica de Mandioca - Hevea", category: "Cereais e Farináceos", stock: 20, unit: "500g", cost: 8.55, price: 19, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305030", imageUrl: "https://meuquintalorganicos.com.br/assets/products/87201-img_3120.jpeg", videoUrl: "" },
  { id: "P039", name: "Farinha de Arroz Orgânico Branco - Volkmann", category: "Cereais e Farináceos", stock: 20, unit: "850g", cost: 7.2, price: 16, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305031", imageUrl: "https://meuquintalorganicos.com.br/assets/products/98cfd-farinha-de-arroz.jpg", videoUrl: "" },
  { id: "P040", name: "Farinha de Mandioca Flocada Orgânica- Biorganica", category: "Cereais e Farináceos", stock: 20, unit: "500g", cost: 6.3, price: 14, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305032", imageUrl: "https://meuquintalorganicos.com.br/assets/products/7dfca-img_6623.jpeg", videoUrl: "" },
  { id: "P041", name: "Farinha de Mandioca Orgânica Torrada - Biorganica", category: "Cereais e Farináceos", stock: 20, unit: "500g", cost: 6.75, price: 15, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305033", imageUrl: "https://meuquintalorganicos.com.br/assets/products/40356-img_6624.jpeg", videoUrl: "" },
  { id: "P042", name: "Feijão Carioca Orgânico - Biorgânica", category: "Cereais e Farináceos", stock: 20, unit: "500g", cost: 7.2, price: 16, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305034", imageUrl: "https://meuquintalorganicos.com.br/assets/products/bfa79-img_6620.jpeg", videoUrl: "" },
  { id: "P043", name: "Farinha de Trigo Orgânico Branca - Biorganica", category: "Cereais e Farináceos", stock: 20, unit: "500g", cost: 6.3, price: 14, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305035", imageUrl: "https://meuquintalorganicos.com.br/assets/products/56caf-img_6621.jpeg", videoUrl: "" },
  { id: "P044", name: "Fubá Orgânico - Biorganico", category: "Cereais e Farináceos", stock: 20, unit: "500g", cost: 6.3, price: 14, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305036", imageUrl: "https://meuquintalorganicos.com.br/assets/products/58dab-img_6619.jpeg", videoUrl: "" },
  { id: "P045", name: "Feijão Preto Orgânico - Biorgânica", category: "Cereais e Farináceos", stock: 20, unit: "500g", cost: 7.2, price: 16, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305037", imageUrl: "https://meuquintalorganicos.com.br/assets/products/70857-img_8946.jpeg", videoUrl: "" },
  { id: "P046", name: "Farinha de Biju Milho - Biorgânica", category: "Cereais e Farináceos", stock: 20, unit: "pct. 400g", cost: 6.3, price: 14, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305038", imageUrl: "https://meuquintalorganicos.com.br/assets/products/221d4-captura-de-tela-2026-06-23-081806.png", videoUrl: "" },
  { id: "P047", name: "Alho Orgânico", category: "Legumes, Tubérculos e Raízes", stock: 20, unit: "pct.110-140g", cost: 4.95, price: 11, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305039", imageUrl: "https://meuquintalorganicos.com.br/assets/products/c1ad7-alho.jpg", videoUrl: "" },
  { id: "P048", name: "Beterraba Orgânica", category: "Legumes, Tubérculos e Raízes", stock: 20, unit: "4 a 5 unid.", cost: 3.83, price: 8.5, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305041", imageUrl: "https://meuquintalorganicos.com.br/assets/products/c9a94-beterraba.jpg", videoUrl: "" },
  { id: "P049", name: "Mandioca Orgânica", category: "Legumes, Tubérculos e Raízes", stock: 20, unit: "pct. 1kg", cost: 3.6, price: 8, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305042", imageUrl: "https://meuquintalorganicos.com.br/assets/products/8119b-mandioca.jpg", videoUrl: "" },
  { id: "P050", name: "Batata-doce Orgânica (polpa amarela)", category: "Legumes, Tubérculos e Raízes", stock: 20, unit: "pct.500~600g", cost: 3.49, price: 7.75, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305043", imageUrl: "https://meuquintalorganicos.com.br/assets/products/f100f-batatadoce-amarela.jpg", videoUrl: "" },
  { id: "P051", name: "Gengibre Orgânico", category: "Legumes, Tubérculos e Raízes", stock: 20, unit: "pct. 200~250g", cost: 3.15, price: 7, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305044", imageUrl: "https://meuquintalorganicos.com.br/assets/products/bd911-gengibre.jpg", videoUrl: "" },
  { id: "P052", name: "Tomate Orgânico", category: "Legumes, Tubérculos e Raízes", stock: 20, unit: "pct. 500g", cost: 4.73, price: 10.5, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0702.00.00", barcode: "7891020305045", imageUrl: "https://meuquintalorganicos.com.br/assets/products/b6f09-tomate.jpg", videoUrl: "" },
  { id: "P053", name: "Inhame Orgânico", category: "Legumes, Tubérculos e Raízes", stock: 20, unit: "pct. 500g", cost: 3.6, price: 8, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305046", imageUrl: "https://meuquintalorganicos.com.br/assets/products/13dfc-inhame.jpg", videoUrl: "" },
  { id: "P054", name: "Batata Orgânica", category: "Legumes, Tubérculos e Raízes", stock: 20, unit: "pct. 500g", cost: 3.83, price: 8.5, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305047", imageUrl: "https://meuquintalorganicos.com.br/assets/products/361d9-batata.jpg", videoUrl: "" },
  { id: "P055", name: "Cebola Orgânica", category: "Legumes, Tubérculos e Raízes", stock: 20, unit: "pct. 500g", cost: 3.6, price: 8, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305048", imageUrl: "https://meuquintalorganicos.com.br/assets/products/762e7-cebola.jpg", videoUrl: "" },
  { id: "P056", name: "Batata-Doce Orgânica (polpa roxa)", category: "Legumes, Tubérculos e Raízes", stock: 20, unit: "pct.600-700g", cost: 4.16, price: 9.25, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305049", imageUrl: "https://meuquintalorganicos.com.br/assets/products/178d5-batata-doce-polpa-roxa.png", videoUrl: "" },
  { id: "P057", name: "Chuchu Orgânico", category: "Legumes, Tubérculos e Raízes", stock: 20, unit: "Unid. 300g-400g", cost: 3.15, price: 7, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305050", imageUrl: "https://meuquintalorganicos.com.br/assets/products/d5d1a-chuchu.jpg", videoUrl: "" },
  { id: "P058", name: "Tomatinho Grape Orgânico", category: "Legumes, Tubérculos e Raízes", stock: 20, unit: "pct. 180-200g", cost: 2.93, price: 6.5, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305051", imageUrl: "https://meuquintalorganicos.com.br/assets/products/14c65-tomatinho.jpg", videoUrl: "" },
  { id: "P059", name: "Açafrão da Terra Orgânico (cúrcuma)", category: "Legumes, Tubérculos e Raízes", stock: 20, unit: "150g", cost: 2.02, price: 4.5, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305052", imageUrl: "https://meuquintalorganicos.com.br/assets/products/70d5a-acafrao.jpg", videoUrl: "" },
  { id: "P060", name: "Abobrinha Italiana Orgânica", category: "Legumes, Tubérculos e Raízes", stock: 20, unit: "pct.500-600g", cost: 3.83, price: 8.5, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305053", imageUrl: "https://meuquintalorganicos.com.br/assets/products/946fb-abobrinha-italianaa.jpg", videoUrl: "" },
  { id: "P061", name: "Pepino Japonês Orgânico", category: "Legumes, Tubérculos e Raízes", stock: 20, unit: "pct. 300-400g", cost: 3.38, price: 7.5, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305054", imageUrl: "https://meuquintalorganicos.com.br/assets/products/50422-pepino-japones.jpg", videoUrl: "" },
  { id: "P062", name: "Abóbora Kabotiá Orgânica", category: "Legumes, Tubérculos e Raízes", stock: 20, unit: "unid. 2,0~2,2kg", cost: 7.2, price: 16, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305055", imageUrl: "https://meuquintalorganicos.com.br/assets/products/849a7-kabocha-abobora-japonesa-full.jpg", videoUrl: "" },
  { id: "P063", name: "Cará Orgânico", category: "Legumes, Tubérculos e Raízes", stock: 20, unit: "Unid. 0,5-0,7", cost: 3.6, price: 8, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305056", imageUrl: "https://meuquintalorganicos.com.br/assets/products/9d337-cara.jpg", videoUrl: "" },
  { id: "P064", name: "Batata-Doce Orgânica (polpa laranja)", category: "Legumes, Tubérculos e Raízes", stock: 20, unit: "pct.500g", cost: 3.6, price: 8, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305057", imageUrl: "https://meuquintalorganicos.com.br/assets/products/cb4c6-batata-doce.jpg", videoUrl: "" },
  { id: "P065", name: "Mandioquinha Amarela Orgânica", category: "Legumes, Tubérculos e Raízes", stock: 20, unit: "pct.500g", cost: 5.63, price: 12.5, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305058", imageUrl: "https://meuquintalorganicos.com.br/assets/products/14b53-824d4eb7-98e3-40a0-a09d-4214be7e4f00.jpeg", videoUrl: "" },
  { id: "P066", name: "Berinjela Rajada Orgânica", category: "Legumes, Tubérculos e Raízes", stock: 20, unit: "pct. 450-500g", cost: 3.38, price: 7.5, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305059", imageUrl: "https://meuquintalorganicos.com.br/assets/products/ba531-c8a0ce05-941a-4252-b6c2-87a4b01f66f3.jpeg", videoUrl: "" },
  { id: "P067", name: "Alho Orgânico Triturado - FAMO", category: "Legumes, Tubérculos e Raízes", stock: 20, unit: "150g - s\sal", cost: 8.78, price: 19.5, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305060", imageUrl: "https://meuquintalorganicos.com.br/assets/products/46a67-alho-triturado-famo-sem-sal.jpg", videoUrl: "" },
  { id: "P068", name: "Palmito Fresco Orgânico - Tolete", category: "Legumes, Tubérculos e Raízes", stock: 20, unit: "500g", cost: 8.1, price: 18, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305061", imageUrl: "https://meuquintalorganicos.com.br/assets/products/cab8a-39f706fb-c362-450a-a4b3-0345962d0e2c.jpeg", videoUrl: "" },
  { id: "P069", name: "Iogurte Orgânico Natural - Nata da Serra", category: "Ovos e Laticínios", stock: 20, unit: "950g", cost: 11.25, price: 25, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305062", imageUrl: "https://meuquintalorganicos.com.br/assets/products/a7434-natural.jpg", videoUrl: "" },
  { id: "P070", name: "Iogurte Orgânico com Mel - Nata da Serra", category: "Ovos e Laticínios", stock: 20, unit: "950g", cost: 11.25, price: 25, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0409.00.00", barcode: "7891020305063", imageUrl: "https://meuquintalorganicos.com.br/assets/products/68175-mel.jpg", videoUrl: "" },
  { id: "P071", name: "Queijo Mussarela Orgânico - Nata da Serra", category: "Ovos e Laticínios", stock: 20, unit: "470~570g", cost: 26.55, price: 59, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305064", imageUrl: "https://meuquintalorganicos.com.br/assets/products/6c6b1-2c1867a6-c034-41da-b7ac-93a76ff5dc19.jpeg", videoUrl: "" },
  { id: "P072", name: "Ovos Orgânicos - Faz. Malabar", category: "Ovos e Laticínios", stock: 20, unit: "18 unids Grande", cost: 15.3, price: 34, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0407.21.00", barcode: "7891020305065", imageUrl: "https://meuquintalorganicos.com.br/assets/products/778f6-ovos-organicos-malabar.jpg", videoUrl: "" },
  { id: "P073", name: "Ovos Orgânicos - Faz. Raiar", category: "Ovos e Laticínios", stock: 20, unit: "10 unids. Jumbo", cost: 10.35, price: 23, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0407.21.00", barcode: "7891020305067", imageUrl: "https://meuquintalorganicos.com.br/assets/products/8e140-img_3214.jpeg", videoUrl: "" },
  { id: "P074", name: "Queijo Mussarela Orgânico de Búfala - bola cereja", category: "Ovos e Laticínios", stock: 20, unit: "pct.~300g", cost: 15.75, price: 35, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305068", imageUrl: "https://meuquintalorganicos.com.br/assets/products/ef424-e59f1e38-90fd-4d25-b380-e1f0661ace9c.jpeg", videoUrl: "" },
  { id: "P075", name: "Queijo Mussarela Orgânico de Búfala - Barra", category: "Ovos e Laticínios", stock: 20, unit: "pct.400~500g", cost: 17.1, price: 38, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305069", imageUrl: "https://meuquintalorganicos.com.br/assets/products/16acf-mussarela-de-bufala-barra-organica-300g400g-gondwana.jpg", videoUrl: "" },
  { id: "P076", name: "Queijo Mussarela Orgânico de Búfala - Palito", category: "Ovos e Laticínios", stock: 20, unit: "pct.~300g", cost: 12.6, price: 28, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305070", imageUrl: "https://meuquintalorganicos.com.br/assets/products/2e02c-mussarela-de-bufala-palito-organica-300g-gondwana.jpg", videoUrl: "" },
  { id: "P077", name: "Ovos Orgânicos - Granja Itaporã", category: "Ovos e Laticínios", stock: 20, unit: "10 unid. grande", cost: 11.03, price: 24.5, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0407.21.00", barcode: "7891020305072", imageUrl: "https://meuquintalorganicos.com.br/assets/products/24dda-img_9087.jpeg", videoUrl: "" },
  { id: "P078", name: "Limão tahiti Orgânico", category: "Frutas", stock: 20, unit: "pct.500g", cost: 2.7, price: 6, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0805.50.00", barcode: "7891020305074", imageUrl: "https://meuquintalorganicos.com.br/assets/products/c4f01-limao.jpg", videoUrl: "" },
  { id: "P079", name: "Abacaxi Orgânico", category: "Frutas", stock: 20, unit: "unid.", cost: 8.1, price: 18, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0804.30.00", barcode: "7891020305075", imageUrl: "https://meuquintalorganicos.com.br/assets/products/e274d-abacaxi.jpg", videoUrl: "" },
  { id: "P080", name: "Abacate Orgânico", category: "Frutas", stock: 20, unit: "Unid. 400-600g", cost: 2.02, price: 4.5, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305076", imageUrl: "https://meuquintalorganicos.com.br/assets/products/64ce7-abacate.jpg", videoUrl: "" },
  { id: "P081", name: "Maçã Gala Orgânica", category: "Frutas", stock: 20, unit: "pct.400-500g", cost: 6.53, price: 14.5, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0808.10.00", barcode: "7891020305077", imageUrl: "https://meuquintalorganicos.com.br/assets/products/5ffc0-maca.jpg", videoUrl: "" },
  { id: "P082", name: "Limão Cravo Orgânico", category: "Frutas", stock: 20, unit: "pct. 450-500g", cost: 2.25, price: 5, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0805.50.00", barcode: "7891020305078", imageUrl: "https://meuquintalorganicos.com.br/assets/products/47d0d-limao-cravo.jpg", videoUrl: "" },
  { id: "P083", name: "Laranja Lima Orgânica", category: "Frutas", stock: 20, unit: "pct.1kg", cost: 6.75, price: 15, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305079", imageUrl: "https://meuquintalorganicos.com.br/assets/products/0760e-laranja-lima.png", videoUrl: "" },
  { id: "P084", name: "Laranja Bahia Orgânica", category: "Frutas", stock: 20, unit: "pct.0,9-1,0kg", cost: 5.85, price: 13, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305080", imageUrl: "https://meuquintalorganicos.com.br/assets/products/bf8fc-laranja-bahia-site.jpg", videoUrl: "" },
  { id: "P085", name: "Limão Siciliano Orgânico", category: "Frutas", stock: 20, unit: "pct.400-500g", cost: 2.7, price: 6, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0805.50.00", barcode: "7891020305081", imageUrl: "https://meuquintalorganicos.com.br/assets/products/13a8d-limao-siciliano.jpg", videoUrl: "" },
  { id: "P086", name: "Laranja Pera Orgânica", category: "Frutas", stock: 20, unit: "Pct. 1kg", cost: 5.4, price: 12, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0808.30.00", barcode: "7891020305082", imageUrl: "https://meuquintalorganicos.com.br/assets/products/9f34c-laranja-pera-valencia.jpg", videoUrl: "" },
  { id: "P087", name: "Melão Amarelo Orgânico", category: "Frutas", stock: 20, unit: "unid. 0,8-1kg", cost: 8.1, price: 18, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0409.00.00", barcode: "7891020305083", imageUrl: "https://meuquintalorganicos.com.br/assets/products/40725-melao-amarelo.jpg", videoUrl: "" },
  { id: "P088", name: "Maçã Fuji Orgânica", category: "Frutas", stock: 20, unit: "pct.400-500g", cost: 6.75, price: 15, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0808.10.00", barcode: "7891020305084", imageUrl: "https://meuquintalorganicos.com.br/assets/products/96102-maca.jpg", videoUrl: "" },
  { id: "P089", name: "Goiaba Orgânica", category: "Frutas", stock: 20, unit: "pct.350-450g", cost: 6.3, price: 14, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305085", imageUrl: "https://meuquintalorganicos.com.br/assets/products/8b637-goiaba.jpg", videoUrl: "" },
  { id: "P090", name: "Pera Importada Orgânica", category: "Frutas", stock: 20, unit: "400-600g", cost: 5.85, price: 13, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0808.30.00", barcode: "7891020305086", imageUrl: "https://meuquintalorganicos.com.br/assets/products/a7dbc-pera-importada.jpg", videoUrl: "" },
  { id: "P091", name: "Manga Palmer Orgânica", category: "Frutas", stock: 20, unit: "unid. 400-500g", cost: 3.49, price: 7.75, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305087", imageUrl: "https://meuquintalorganicos.com.br/assets/products/bd159-palmer.jpg", videoUrl: "" },
  { id: "P092", name: "Kiwi Orgânico", category: "Frutas", stock: 20, unit: "pct.450g", cost: 11.7, price: 26, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305088", imageUrl: "https://meuquintalorganicos.com.br/assets/products/4533e-img_0019.jpg", videoUrl: "" },
  { id: "P093", name: "Mexerica Orgânica", category: "Frutas", stock: 20, unit: "1kg", cost: 5.4, price: 12, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305089", imageUrl: "https://meuquintalorganicos.com.br/assets/products/a2818-mexerica-carioca-organicos.jpg", videoUrl: "" },
  { id: "P094", name: "Mamão Papaia Orgânico", category: "Frutas", stock: 20, unit: "unid. 400-500g", cost: 5.74, price: 12.75, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305090", imageUrl: "https://meuquintalorganicos.com.br/assets/products/5b230-0a2b22e1-92da-4d63-a50d-493ee34a2769.jpeg", videoUrl: "" },
  { id: "P095", name: "Mamão Formosa Orgânico", category: "Frutas", stock: 20, unit: "unid. 0,900-1,1kg", cost: 7.2, price: 16, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305091", imageUrl: "https://meuquintalorganicos.com.br/assets/products/4c932-mamaoformosa.jpg", videoUrl: "" },
  { id: "P096", name: "Decopon", category: "Frutas", stock: 20, unit: "pct.1kg", cost: 7.2, price: 16, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305092", imageUrl: "https://meuquintalorganicos.com.br/assets/products/be2a3-decopon.jpg", videoUrl: "" },
  { id: "P097", name: "Laranja Champanhe", category: "Frutas", stock: 20, unit: "Pct.1kg", cost: 5.4, price: 12, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305093", imageUrl: "https://meuquintalorganicos.com.br/assets/products/8d42e-9b8ef3c8-405f-4ca2-b874-18c2781c2ea2.jpeg", videoUrl: "" },
  { id: "P098", name: "Lima da Pérsia", category: "Frutas", stock: 20, unit: "Pct.400-500g", cost: 3.6, price: 8, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305094", imageUrl: "https://meuquintalorganicos.com.br/assets/products/2a5a5-44b80e0d-cece-469e-914e-93309bb05e5a.jpeg", videoUrl: "" },
  { id: "P099", name: "Tâmaras Secas Orgânicas - Medjoul", category: "Frutas", stock: 20, unit: "bdj. 500g", cost: 31.5, price: 70, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305095", imageUrl: "https://meuquintalorganicos.com.br/assets/products/484d4-tamara-madjoul.jpg", videoUrl: "" },
  { id: "P100", name: "Pokan Orgânica", category: "Frutas", stock: 20, unit: "Pct. 1kg", cost: 5.4, price: 12, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305096", imageUrl: "https://meuquintalorganicos.com.br/assets/products/8f41d-68cef0fd-9c2d-4cf1-b05f-c190799e93a0.jpeg", videoUrl: "" },
  { id: "P101", name: "Mexerica Clemenules Orgânica", category: "Frutas", stock: 20, unit: "Pct. 1kg", cost: 5.4, price: 12, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305097", imageUrl: "https://meuquintalorganicos.com.br/assets/products/5dbc8-b1c9ca52-13da-4a97-a95c-792caa2c06a8.jpeg", videoUrl: "" },
  { id: "P102", name: "Uva Passa Orgânica - Alvorada", category: "Frutas", stock: 20, unit: "pct.150g", cost: 12.15, price: 27, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305098", imageUrl: "https://meuquintalorganicos.com.br/assets/products/ce0f9-uva-passa-organica-alvorada.jpg", videoUrl: "" },
  { id: "P103", name: "Tahine Orgânico - Alvorada", category: "Sucos, bebidas e Molhos", stock: 20, unit: "Unid. 250g", cost: 14.4, price: 32, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305099", imageUrl: "https://meuquintalorganicos.com.br/assets/products/9e1d5-68b7a351-adc8-4e2d-8c49-348affbf9537.jpeg", videoUrl: "" },
  { id: "P104", name: "Molho Orgânico de Tomate - Alvorada", category: "Sucos, bebidas e Molhos", stock: 20, unit: "320g", cost: 11.25, price: 25, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0702.00.00", barcode: "7891020305100", imageUrl: "https://meuquintalorganicos.com.br/assets/products/20f32-img_9105.jpeg", videoUrl: "" },
  { id: "P105", name: "Suco de Uva Integral Orgânico - Organovitta", category: "Sucos, bebidas e Molhos", stock: 20, unit: "1 litro", cost: 17.55, price: 39, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305101", imageUrl: "https://meuquintalorganicos.com.br/assets/products/26cca-img_8583.jpeg", videoUrl: "" },
  { id: "P106", name: "Polpa de Tomate Orgânico - Alvorada", category: "Sucos, bebidas e Molhos", stock: 20, unit: "550g", cost: 12.15, price: 27, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0702.00.00", barcode: "7891020305102", imageUrl: "https://meuquintalorganicos.com.br/assets/products/0d986-img_9016.jpeg", videoUrl: "" },
  { id: "P107", name: "Goiabada Orgânica - do Pé ao Pote", category: "Geléias, Méis e Ervas Secas", stock: 20, unit: "Barra  500g", cost: 13.5, price: 30, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305103", imageUrl: "https://meuquintalorganicos.com.br/assets/products/d4e79-46048745-fbe8-4a85-85ed-adb39ded5f3c.jpeg", videoUrl: "" },
  { id: "P108", name: "Curry Orgânico", category: "Geléias, Méis e Ervas Secas", stock: 20, unit: "pct.15g", cost: 3.6, price: 8, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305104", imageUrl: "https://meuquintalorganicos.com.br/assets/products/e338a-a2c0348b-44f3-4828-9e95-55d0f9936770.jpeg", videoUrl: "" },
  { id: "P109", name: "Cravo da índia Orgânico", category: "Geléias, Méis e Ervas Secas", stock: 20, unit: "pct. 7g", cost: 3.6, price: 8, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305105", imageUrl: "https://meuquintalorganicos.com.br/assets/products/5b4ad-f5d5f219-1536-43ce-8b0e-b00c00735bf5.jpeg", videoUrl: "" },
  { id: "P110", name: "Louro Orgânico", category: "Geléias, Méis e Ervas Secas", stock: 20, unit: "pct.3g", cost: 3.6, price: 8, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305106", imageUrl: "https://meuquintalorganicos.com.br/assets/products/9a287-5047398a-c340-4cbe-9806-e73960af5b56.jpeg", videoUrl: "" },
  { id: "P111", name: "Orégano Orgânico", category: "Geléias, Méis e Ervas Secas", stock: 20, unit: "pct.10g", cost: 3.6, price: 8, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305107", imageUrl: "https://meuquintalorganicos.com.br/assets/products/18d1c-9b83aeb6-ee2f-42c1-9fd4-23757867bc19.jpeg", videoUrl: "" },
  { id: "P112", name: "Chimichurri Orgânico", category: "Geléias, Méis e Ervas Secas", stock: 20, unit: "pct.15g", cost: 3.6, price: 8, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305108", imageUrl: "https://meuquintalorganicos.com.br/assets/products/b1e4b-a3230b0b-e977-42e7-9020-633d6f985f75.jpeg", videoUrl: "" },
  { id: "P113", name: "Açafrão Orgânico", category: "Geléias, Méis e Ervas Secas", stock: 20, unit: "pct. 15g", cost: 3.6, price: 8, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305109", imageUrl: "https://meuquintalorganicos.com.br/assets/products/797ee-78942c29-ff3b-4770-9704-2b0b1c069638.jpeg", videoUrl: "" },
  { id: "P114", name: "Tomilho Orgânico", category: "Geléias, Méis e Ervas Secas", stock: 20, unit: "pct. 10g", cost: 3.6, price: 8, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305110", imageUrl: "https://meuquintalorganicos.com.br/assets/products/036f3-tomilho-organicos-quintal-verde.jpg", videoUrl: "" },
  { id: "P115", name: "Pimenta do Reino Orgânica", category: "Geléias, Méis e Ervas Secas", stock: 20, unit: "pct. 10g", cost: 3.6, price: 8, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305111", imageUrl: "https://meuquintalorganicos.com.br/assets/products/2b91a-9c4512da-e7e6-4cf8-88ee-eede89840e8f.jpeg", videoUrl: "" },
  { id: "P116", name: "Gengibre Orgânico em pó", category: "Geléias, Méis e Ervas Secas", stock: 20, unit: "Pct. 15g", cost: 3.6, price: 8, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305112", imageUrl: "https://meuquintalorganicos.com.br/assets/products/cd563-0ccd359e-1c56-4f47-8d0b-90c8d3204449.jpeg", videoUrl: "" },
  { id: "P117", name: "Canela Orgânica em pau", category: "Geléias, Méis e Ervas Secas", stock: 20, unit: "Pct.10g", cost: 3.6, price: 8, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305113", imageUrl: "https://meuquintalorganicos.com.br/assets/products/82ee5-0f00db7f-b56a-4a59-a6c5-1c981cba4f66.jpeg", videoUrl: "" },
  { id: "P118", name: "Canela Orgânica em pó", category: "Geléias, Méis e Ervas Secas", stock: 20, unit: "Pct. 10g", cost: 3.6, price: 8, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305114", imageUrl: "https://meuquintalorganicos.com.br/assets/products/b633c-0a05ff38-7274-4baa-8e39-c6079e7ae9e7.jpeg", videoUrl: "" },
  { id: "P119", name: "Mel Silvestre Orgânico - Alvorada", category: "Geléias, Méis e Ervas Secas", stock: 20, unit: "Vidro. 330g", cost: 18, price: 40, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0409.00.00", barcode: "7891020305115", imageUrl: "https://meuquintalorganicos.com.br/assets/products/3f0af-056cc913-482f-4adb-ac13-5c61ca170fd4.jpeg", videoUrl: "" },
  { id: "P120", name: "Compota de Laranja Orgânica - do Pé ao Pote", category: "Geléias, Méis e Ervas Secas", stock: 20, unit: "Pct. 700g", cost: 16.65, price: 37, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305116", imageUrl: "https://meuquintalorganicos.com.br/assets/products/27f2a-8ac3cbfc-9a04-4e8b-b561-8d7cc8f40848.jpeg", videoUrl: "" },
  { id: "P121", name: "Melissa Orgânica", category: "Geléias, Méis e Ervas Secas", stock: 20, unit: "pct. 10g", cost: 3.6, price: 8, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0409.00.00", barcode: "7891020305117", imageUrl: "https://meuquintalorganicos.com.br/assets/products/546c2-melissa-organico-quintal-verde.png", videoUrl: "" },
  { id: "P122", name: "Sálvia Orgânica", category: "Geléias, Méis e Ervas Secas", stock: 20, unit: "pct. 10g", cost: 3.6, price: 8, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305118", imageUrl: "https://meuquintalorganicos.com.br/assets/products/96cad-salvia-organica.png", videoUrl: "" },
  { id: "P123", name: "Alecrim Orgânico", category: "Geléias, Méis e Ervas Secas", stock: 20, unit: "pct. 10g", cost: 3.6, price: 8, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305119", imageUrl: "https://meuquintalorganicos.com.br/assets/products/28f2a-alecrim-organico.jpeg", videoUrl: "" },
  { id: "P124", name: "Capim Cidreira Orgânico", category: "Geléias, Méis e Ervas Secas", stock: 20, unit: "pct.10g", cost: 3.6, price: 8, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305120", imageUrl: "https://meuquintalorganicos.com.br/assets/products/14ea4-capim-cideira-organica.jpeg", videoUrl: "" },
  { id: "P125", name: "Camomila Orgânica", category: "Geléias, Méis e Ervas Secas", stock: 20, unit: "pct.10g", cost: 3.6, price: 8, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305121", imageUrl: "https://meuquintalorganicos.com.br/assets/products/0163e-camomila-organica.jpg", videoUrl: "" },
  { id: "P126", name: "Erva Doce Orgânica", category: "Geléias, Méis e Ervas Secas", stock: 20, unit: "pct. 15g", cost: 3.6, price: 8, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305122", imageUrl: "https://meuquintalorganicos.com.br/assets/products/33a78-erva-doce-organico.jpeg", videoUrl: "" },
  { id: "P127", name: "Manjerona Orgânica", category: "Geléias, Méis e Ervas Secas", stock: 20, unit: "pct.10g", cost: 3.6, price: 8, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305123", imageUrl: "https://meuquintalorganicos.com.br/assets/products/eb987-manjerona-organica-quintal-verde.png", videoUrl: "" },
  { id: "P128", name: "Colorau Orgânico", category: "Geléias, Méis e Ervas Secas", stock: 20, unit: "pct.10g", cost: 3.6, price: 8, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305124", imageUrl: "https://meuquintalorganicos.com.br/assets/products/313fe-colorau-organico-sache.jpg", videoUrl: "" },
  { id: "P129", name: "Lemon Pepper Orgânico", category: "Geléias, Méis e Ervas Secas", stock: 20, unit: "Pct. 10g", cost: 3.6, price: 8, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305125", imageUrl: "https://meuquintalorganicos.com.br/assets/products/3ad34-img_8095.jpeg", videoUrl: "" },
  { id: "P130", name: "Geléia de Morango Orgânica - Alvorada", category: "Geléias, Méis e Ervas Secas", stock: 20, unit: "Pct. 280g", cost: 13.5, price: 30, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0810.10.00", barcode: "7891020305126", imageUrl: "https://meuquintalorganicos.com.br/assets/products/5e9c4-img_9979.jpeg", videoUrl: "" },
  { id: "P131", name: "Coentro em Grãos - Quintal Verde", category: "Geléias, Méis e Ervas Secas", stock: 20, unit: "Pct.10g", cost: 3.6, price: 8, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305127", imageUrl: "https://meuquintalorganicos.com.br/assets/products/0d514-img_9980.jpeg", videoUrl: "" },
  { id: "P132", name: "Doce de leite Org. com coco - pé ao pote", category: "Geléias, Méis e Ervas Secas", stock: 20, unit: "pct.300g", cost: 13.5, price: 30, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305128", imageUrl: "https://meuquintalorganicos.com.br/assets/products/a6977-captura-de-tela-2026-02-25-162236.png", videoUrl: "" },
  { id: "P133", name: "Composto MQorg.", category: "Adubos", stock: 20, unit: "1kg", cost: 2.25, price: 5, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305129", imageUrl: "https://meuquintalorganicos.com.br/assets/products/a930c-composto.jpg", videoUrl: "" },
  { id: "P134", name: "Vinagre de Maçã - S. Francisco", category: "Óleo e Vinagres", stock: 20, unit: "500ml", cost: 16.65, price: 37, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0808.10.00", barcode: "7891020305130", imageUrl: "https://meuquintalorganicos.com.br/assets/products/3c50a-viangre-de-maca.jpg", videoUrl: "" },
  { id: "P135", name: "Óleo de Soja Orgânica - Biorganica", category: "Óleo e Vinagres", stock: 20, unit: "500ml", cost: 9.9, price: 22, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305131", imageUrl: "https://meuquintalorganicos.com.br/assets/products/422be-oleo-de-soja-organico-biorganica.jpg", videoUrl: "" },
  { id: "P136", name: "Chá de Erva Doce Orgânico - Quintal Verde", category: "Café e Chá", stock: 20, unit: "cx. 10 saches", cost: 5.85, price: 13, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305132", imageUrl: "https://meuquintalorganicos.com.br/assets/products/8c565-cha-erva-doce-sache-quintal-verde-organico.jpg", videoUrl: "" },
  { id: "P137", name: "Chá verde Orgânico - Quintal verde", category: "Café e Chá", stock: 20, unit: "Cx.10 sachês", cost: 5.85, price: 13, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305133", imageUrl: "https://meuquintalorganicos.com.br/assets/products/19ef1-cha-verde-quintal-verde-organico.png", videoUrl: "" },
  { id: "P138", name: "Chá Capim Cidreira Orgânico - Quintal verde", category: "Café e Chá", stock: 20, unit: "cx. 10 sachês", cost: 5.85, price: 13, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305134", imageUrl: "https://meuquintalorganicos.com.br/assets/products/8a54e-cha-cidreira-organico-quintal-verde.png", videoUrl: "" },
  { id: "P139", name: "Chá Orgânico de Melissa - Quintal Verde", category: "Café e Chá", stock: 20, unit: "10 sachês", cost: 5.85, price: 13, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0409.00.00", barcode: "7891020305135", imageUrl: "https://meuquintalorganicos.com.br/assets/products/38268-cha-melissa-quintal-verde.jpeg", videoUrl: "" },
  { id: "P140", name: "Chá de Hibisco Orgânico - Quintal Verde", category: "Café e Chá", stock: 20, unit: "10 sachês", cost: 5.85, price: 13, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305136", imageUrl: "https://meuquintalorganicos.com.br/assets/products/d1a81-cha-hibisco-quintal-verde.jpg", videoUrl: "" },
  { id: "P141", name: "Cogumelo Orgânico Shitake", category: "Cogumelos e TOFU", stock: 20, unit: "bdj.200g", cost: 8.1, price: 18, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0409.00.00", barcode: "7891020305137", imageUrl: "https://meuquintalorganicos.com.br/assets/products/43a3c-cogumelo-shitake-fresco-organicos.jpg", videoUrl: "" },
  { id: "P142", name: "Cogumelo Orgânico Paris", category: "Cogumelos e TOFU", stock: 20, unit: "bdj. 200g", cost: 7.65, price: 17, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0409.00.00", barcode: "7891020305138", imageUrl: "https://meuquintalorganicos.com.br/assets/products/8c0a6-ffc5a77f-4f80-47e9-8cda-926f14e96b1b.jpeg", videoUrl: "" },
  { id: "P143", name: "Cogumelo Orgânico Porto Belo", category: "Cogumelos e TOFU", stock: 20, unit: "bdj. 200g", cost: 7.65, price: 17, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0409.00.00", barcode: "7891020305139", imageUrl: "https://meuquintalorganicos.com.br/assets/products/bc8fd-cdf85a62-5678-447d-95bd-9ae6f4c207ce.jpeg", videoUrl: "" },
  { id: "P144", name: "Patê de Soja Orgânico - Alho", category: "Cogumelos e TOFU", stock: 20, unit: "110g", cost: 8.55, price: 19, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305140", imageUrl: "https://meuquintalorganicos.com.br/assets/products/ad944-img_8928.jpeg", videoUrl: "" },
  { id: "P145", name: "Tofu Defumado Orgânico", category: "Cogumelos e TOFU", stock: 20, unit: "110g", cost: 13.5, price: 30, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305141", imageUrl: "https://meuquintalorganicos.com.br/assets/products/4b125-img_8926.jpeg", videoUrl: "" },
  { id: "P146", name: "Tofu Orgânico", category: "Cogumelos e TOFU", stock: 20, unit: "450g", cost: 15.3, price: 34, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305142", imageUrl: "https://meuquintalorganicos.com.br/assets/products/499dc-img_8924.jpeg", videoUrl: "" },
  { id: "P147", name: "Polpa Orgânica Morango", category: "Sorvetes e Congelados", stock: 20, unit: "90g", cost: 4.05, price: 9, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0810.10.00", barcode: "7891020305143", imageUrl: "https://meuquintalorganicos.com.br/assets/products/1252d-polpa_de_morango_lanaturelle-polpa.jpg", videoUrl: "" },
  { id: "P148", name: "Polpa Orgânica Amora", category: "Sorvetes e Congelados", stock: 20, unit: "90g", cost: 4.05, price: 9, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305144", imageUrl: "https://meuquintalorganicos.com.br/assets/products/75412-amora-polpa-organica-amora-90-g-la-naturelle.jpg", videoUrl: "" },
  { id: "P149", name: "Polpa Orgânica Açaí", category: "Sorvetes e Congelados", stock: 20, unit: "90g", cost: 4.05, price: 9, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305145", imageUrl: "https://meuquintalorganicos.com.br/assets/products/1805b-polpa-de-acai-organico-un-90g-la-naturelle.jpg", videoUrl: "" },
  { id: "P150", name: "Pão de Queijo Orgânico Coquetel - La Naturelle", category: "Sorvetes e Congelados", stock: 20, unit: "200g", cost: 7.09, price: 15.75, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305146", imageUrl: "https://meuquintalorganicos.com.br/assets/products/e3ccf-pao-de-queijo-coquetel-organico-200g-la-naturelle.jpg", videoUrl: "" },
  { id: "P151", name: "Purê Org. Maçã, Cenoura e Batata Doce - Papapá", category: "Papinha e comidinhas infantis", stock: 20, unit: "100g", cost: 4.84, price: 10.75, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0706.10.00", barcode: "7891020305147", imageUrl: "https://meuquintalorganicos.com.br/assets/products/cc55c-papapa-maca-cenoura-e-batata-doce-organicos.png", videoUrl: "" },
  { id: "P152", name: "Purê Org. Maçã e Ameixa - Papapá", category: "Papinha e comidinhas infantis", stock: 20, unit: "100g", cost: 4.84, price: 10.75, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0808.10.00", barcode: "7891020305148", imageUrl: "https://meuquintalorganicos.com.br/assets/products/79f00-papapa-maca-e-ameixa-organico.png", videoUrl: "" },
  { id: "P153", name: "Purê Org. Morango e Maçã - Papapá", category: "Papinha e comidinhas infantis", stock: 20, unit: "100g", cost: 4.84, price: 10.75, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0810.10.00", barcode: "7891020305149", imageUrl: "https://meuquintalorganicos.com.br/assets/products/f0584-papapa-morango-e-maca-organico.png", videoUrl: "" },
  { id: "P154", name: "Chocolate Orgânico adoçado c/ Tâmara", category: "Chocolates Orgânicos", stock: 20, unit: "80g", cost: 14.85, price: 33, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305150", imageUrl: "https://meuquintalorganicos.com.br/assets/products/4fa86-mare-tamara.jpg", videoUrl: "" },
  { id: "P155", name: "Chocolate Orgânico 75%", category: "Chocolates Orgânicos", stock: 20, unit: "80g", cost: 14.4, price: 32, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305151", imageUrl: "https://meuquintalorganicos.com.br/assets/products/d22ef-mare-75-.jpg", videoUrl: "" },
  { id: "P156", name: "Chocolate Orgânico c/ Banana Passa e Canela", category: "Chocolates Orgânicos", stock: 20, unit: "80g", cost: 14.4, price: 32, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0803.90.00", barcode: "7891020305152", imageUrl: "https://meuquintalorganicos.com.br/assets/products/53207-banana-mare.jpg", videoUrl: "" },
  { id: "P157", name: "Chocolate orgânico c/ açúcar de Coco e Canela", category: "Chocolates Orgânicos", stock: 20, unit: "80g", cost: 14.4, price: 32, expirationDate: "2026-08-01", organicCert: "Certificado", supplierId: "S001", ncm: "0709.99.90", barcode: "7891020305153", imageUrl: "https://meuquintalorganicos.com.br/assets/products/6e610-70-mare.jpg", videoUrl: "" }
];

const DEFAULT_CUSTOMERS = [
  { id: "C001", name: "Mariana Souza Santos", phone: "(11) 98765-4321", email: "mariana.souza@email.com", address: "Av. Paulista, 1000 - Ap 42, Bela Vista, São Paulo - SP", registrationDate: "2026-01-15", status: "Ativo", salesCount: 12, totalSpent: 624.50, document: "123.456.789-10" },
  { id: "C002", name: "Roberto Ramos Cruz", phone: "(11) 97654-3210", email: "roberto.cruz@email.com", address: "Rua Augusta, 450 - Ap 11, Consolação, São Paulo - SP", registrationDate: "2026-03-22", status: "Ativo", salesCount: 7, totalSpent: 389.20, document: "987.654.321-20" },
  { id: "C003", name: "Ana Beatriz Pinheiro", phone: "(11) 96543-2109", email: "ana.pinheiro@email.com", address: "Rua Pamplona, 1200 - Ap 93, Jardim Paulista, São Paulo - SP", registrationDate: "2026-05-01", status: "Ativo", salesCount: 4, totalSpent: 198.40, document: "456.789.123-30" },
  { id: "C004", name: "Carlos Eduardo Lima", phone: "(11) 95432-1098", email: "carlos.lima@email.com", address: "Al. Lorena, 800 - Casa 2, Cerqueira César, São Paulo - SP", registrationDate: "2026-06-10", status: "Ativo", salesCount: 2, totalSpent: 89.90, document: "321.654.987-40" }
];

const DEFAULT_SUPPLIERS = [
  { id: "S001", name: "Sítio Primavera Orgânicos", contactPerson: "Seu João Silva", phone: "(15) 99876-1234", email: "joao.silva@sitioprimavera.com.br", address: "Estrada do Sol, Km 12, Ibiúna - SP", productsSupplied: "Verduras, Frutas", certificationStatus: "Participativo", cnpj: "11.222.333/0001-44", stateInscr: "354.123.456.789" },
  { id: "S002", name: "Fazenda Verde Limpo", contactPerson: "Clara Mendes", phone: "(19) 98765-5678", email: "contato@verdelimpo.com.br", address: "Rodovia Castelo Branco, Km 95, Porto Feliz - SP", productsSupplied: "Frutas, Tomates", certificationStatus: "Auditoria", cnpj: "22.333.444/0001-55", stateInscr: "492.345.678.901" },
  { id: "S003", name: "Cooperativa Terra Viva", contactPerson: "Gilberto Souza", phone: "(11) 94433-2211", email: "comercial@terraviva.org.br", address: "Estrada da Mina, 45, Piedade - SP", productsSupplied: "Legumes, Raízes, Ovos", certificationStatus: "Participativo", cnpj: "33.444.555/0001-66", stateInscr: "582.456.789.012" },
  { id: "S004", name: "Apiário Zangão Dourado", contactPerson: "Marta Abreu", phone: "(35) 98877-6655", email: "contato@zangaodourado.com.br", address: "Fazenda das Flores, Cambuí - MG", productsSupplied: "Mel, Própolis", certificationStatus: "Cadastrado", cnpj: "44.555.666/0001-77", stateInscr: "ISENTO" }
];

const DEFAULT_SALES = [
  {
    id: "V001",
    date: "2026-06-23T10:15:00",
    customerName: "Mariana Souza Santos",
    customerId: "C001",
    items: [
      { id: "P001", name: "Alface Crespa Orgânica", price: 4.50, qty: 2, total: 9.00, cfop: "5.102", csosn: "400" },
      { id: "P003", name: "Banana Prata Orgânica", price: 6.20, qty: 1.5, total: 9.30, cfop: "5.102", csosn: "400" },
      { id: "P008", name: "Ovos Caipiras Orgânicos", price: 16.50, qty: 1, total: 16.50, cfop: "5.102", csosn: "102" }
    ],
    total: 34.80,
    taxAmount: 0.66, // calculated tax
    channel: "WhatsApp",
    status: "Entregue",
    invoiceNumber: "10023",
    cfop: "5.106",
    csosn: "Mixed",
    accessKey: "35260612345678000190650010000100239182736451",
    protocol: "135260029384723",
    xmlSimulated: "" // Generated dynamically
  },
  {
    id: "V002",
    date: "2026-06-24T14:30:00",
    customerName: "Roberto Ramos Cruz",
    customerId: "C002",
    items: [
      { id: "P002", name: "Tomate Cereja Orgânico", price: 7.90, qty: 2, total: 15.80, cfop: "5.102", csosn: "400" },
      { id: "P004", name: "Cenoura Orgânica", price: 5.50, qty: 1.2, total: 6.60, cfop: "5.102", csosn: "400" },
      { id: "P005", name: "Mel de Flores Silvestres Orgânico", price: 32.00, qty: 1, total: 32.00, cfop: "5.102", csosn: "102" }
    ],
    total: 54.40,
    taxAmount: 1.28,
    channel: "iFood",
    status: "Entregue",
    invoiceNumber: "10024",
    cfop: "5.106",
    csosn: "Mixed",
    accessKey: "35260612345678000190650010000100249182736452",
    protocol: "135260029384724",
    xmlSimulated: ""
  },
  {
    id: "V003",
    date: "2026-06-25T08:12:00",
    customerName: "Ana Beatriz Pinheiro",
    customerId: "C003",
    items: [
      { id: "P006", name: "Morangos Orgânicos", price: 9.80, qty: 3, total: 29.40, cfop: "5.102", csosn: "400" },
      { id: "P008", name: "Ovos Caipiras Orgânicos", price: 16.50, qty: 1, total: 16.50, cfop: "5.102", csosn: "102" }
    ],
    total: 45.90,
    taxAmount: 0.66,
    channel: "CardapioFacil",
    status: "Preparando",
    invoiceNumber: "10025",
    cfop: "5.102",
    csosn: "Mixed",
    accessKey: "35260612345678000190650010000100259182736453",
    protocol: "135260029384725",
    xmlSimulated: ""
  },
  {
    id: "V004",
    date: "2026-06-25T09:00:00",
    customerName: "Cliente Balcão",
    customerId: "walk-in",
    items: [
      { id: "P001", name: "Alface Crespa Orgânica", price: 4.50, qty: 1, total: 4.50, cfop: "5.102", csosn: "400" },
      { id: "P007", name: "Espinafre Orgânico", price: 4.90, qty: 2, total: 9.80, cfop: "5.102", csosn: "400" }
    ],
    total: 14.30,
    taxAmount: 0.00, // Organic full exempt inside SP state
    channel: "Balcão",
    status: "Entregue",
    invoiceNumber: "10026",
    cfop: "5.102",
    csosn: "400",
    accessKey: "35260612345678000190650010000100269182736454",
    protocol: "135260029384726",
    xmlSimulated: ""
  }
];

// Initial dataset for input invoices (Restocking purchases from local producers)
const DEFAULT_ENTRY_INVOICES = [
  {
    id: "E001",
    date: "2026-06-20T08:30:00",
    supplierId: "S001",
    supplierName: "Sítio Primavera Orgânicos",
    items: [
      { id: "P001", name: "Alface Crespa Orgânica", cost: 1.80, qty: 50, total: 90.00, cfop: "1.122", csosn: "400" },
      { id: "P003", name: "Banana Prata Orgânica", cost: 2.50, qty: 40, total: 100.00, cfop: "1.122", csosn: "400" }
    ],
    total: 190.00,
    cfop: "1.122", // Compra de produtor rural
    csosn: "400", // Isento
    taxAmount: 0.00,
    invoiceNumber: "000854",
    status: "Autorizada",
    accessKey: "35260611222333000144550010000008549182736457",
    protocol: "135260098374821",
    xmlSimulated: ""
  },
  {
    id: "E002",
    date: "2026-06-22T09:15:00",
    supplierId: "S003",
    supplierName: "Cooperativa Terra Viva",
    items: [
      { id: "P004", name: "Cenoura Orgânica", cost: 2.10, qty: 60, total: 126.00, cfop: "1.102", csosn: "400" },
      { id: "P008", name: "Ovos Caipiras Orgânicos", cost: 7.00, qty: 30, total: 210.00, cfop: "1.102", csosn: "102" }
    ],
    total: 336.00,
    cfop: "1.102", // Compra para comercialização
    csosn: "Mixed",
    taxAmount: 0.00, // Isento de ICMS de entrada em SP
    invoiceNumber: "000855",
    status: "Autorizada",
    accessKey: "35260633444555000166550010000008559182736458",
    protocol: "135260098374822",
    xmlSimulated: ""
  }
];

const DEFAULT_CHATS = [
  {
    id: "chat_001",
    customerName: "Fernanda Oliveira",
    phone: "(11) 98111-2222",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Fernanda",
    unread: 2,
    aiActive: true,
    lastMsgTime: "06:12",
    messages: [
      { sender: "customer", text: "Bom dia! Vocês têm morango orgânico hoje?", time: "06:10" },
      { sender: "ai", text: "Olá Fernanda! Bom dia! Temos sim! Nossos morangos orgânicos estão fresquinhos hoje no Rancho Orgânico, saindo por R$ 9,80 a bandeja de 300g. Gostaria de reservar alguma?", time: "06:11" },
      { sender: "customer", text: "Sim, por favor! Quero 2 bandejas e também 1 maço de alface crespa.", time: "06:12" }
    ]
  },
  {
    id: "chat_002",
    customerName: "Thiago Silva Pereira",
    phone: "(11) 97222-3333",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Thiago",
    unread: 0,
    aiActive: true,
    lastMsgTime: "Ontem",
    messages: [
      { sender: "customer", text: "Quais são as taxas de entrega para Pinheiros?", time: "Ontem" },
      { sender: "ai", text: "Olá Thiago! Para o bairro de Pinheiros, a entrega de pedidos acima de R$ 50,00 é gratuita pelo Rancho Orgânico! Para pedidos menores, a taxa fixa é de R$ 7,00. Gostaria de fazer seu pedido agora?", time: "Ontem" },
      { sender: "customer", text: "Entendido! Obrigado. Mais tarde faço o pedido.", time: "Ontem" }
    ]
  },
  {
    id: "chat_003",
    customerName: "Patrícia Souza",
    phone: "(11) 96333-4444",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Patricia",
    unread: 0,
    aiActive: false,
    lastMsgTime: "Ontem",
    messages: [
      { sender: "customer", text: "Olá! Meu pedido iFood veio com um tomate amassado. Vocês conseguem me ajudar?", time: "Ontem" },
      { sender: "merchant", text: "Olá Patrícia! Mil desculpas por isso. Aqui no Rancho Orgânico prezamos muito pela qualidade. Vou providenciar o estorno do valor dos tomates pelo painel iFood. O que prefere?", time: "Ontem" },
      { sender: "customer", text: "Obrigada! Prefiro o estorno se puder.", time: "Ontem" },
      { sender: "merchant", text: "Perfeito! Acabo de solicitar o reembolso total da bandeja pelo painel iFood. Peço desculpas novamente pelo ocorrido e tenha um ótimo dia!", time: "Ontem" }
    ]
  }
];

const DEFAULT_AI_CONFIG = {
  prompt: `Você é a atendente inteligente da horta e empório "Rancho Orgânico".
Sua missão é ajudar os clientes a fazer pedidos, consultar disponibilidade de verduras, frutas, legumes e secos orgânicos, esclarecer dúvidas de entrega e formas de pagamento.
Seja sempre simpática, responda em português, use emojis adequados e priorize produtos que estão com muito estoque ou perto do vencimento.
Valores padrão de frete: Grátis acima de R$ 50, caso contrário R$ 7.
Formas de pagamento: Pix, Cartão de Crédito/Débito, e Vale Alimentação (VR/Sodexo).`,
  autoReply: true,
  model: "Gemini 1.5 Flash",
  temperature: 0.7
};

const DEFAULT_STORE_CONFIG = {
  mobileNavType: "footer", // "footer" or "header-dropdown"
  storeTheme: "warm-lime", // "warm-lime", "forest-emerald", "peach-cream", "dark-charcoal"
  catalogLayout: "grid", // "grid" or "list"
  cartBehavior: "auto-open"
};

const DEFAULT_TAX_CONFIG = {
  regime: "Simples Nacional",
  baseTaxRate: 6.0,
  organicDiscount: 2.04, // SP RICMS Art 36 exemption reduces standard rate (6% - 34% of 6% = 3.96% effective)
  icmsExempt: true
};

class RanchoOrganicoDB {
  constructor() {
    this.fs = null;
    this.fsSdk = null;
    this.init();
    this.syncPromise = null;
    if (window.isFirebaseConfigured) {
      this.syncPromise = this.initFirebase();
    }
  }

  async initFirebase() {
    try {
      const [{ initializeApp }, firestoreSdk] = await Promise.all([
        import("https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js"),
        import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js")
      ]);
      const app = initializeApp(window.firebaseConfig);
      this.fs = firestoreSdk.getFirestore(app);
      this.fsSdk = firestoreSdk;
      await this.syncFromFirestore();
    } catch (err) {
      console.error("Erro ao inicializar Firebase DB:", err);
    }
  }

  async syncFromFirestore() {
    if (!this.fs || !this.fsSdk) return;
    try {
      const collections = ["products", "customers", "suppliers", "sales", "entries", "chats", "tax_config", "store_config"];
      for (const col of collections) {
        if (col === "store_config" || col === "tax_config") {
          const docRef = this.fsSdk.doc(this.fs, col, "current");
          const docSnap = await this.fsSdk.getDoc(docRef);
          if (docSnap.exists()) {
            localStorage.setItem(`rancho_${col}`, JSON.stringify(docSnap.data()));
          } else {
            const def = JSON.parse(localStorage.getItem(`rancho_${col}`));
            if (def) await this.fsSdk.setDoc(docRef, def);
          }
        } else {
          const colRef = this.fsSdk.collection(this.fs, col);
          const snapshot = await this.fsSdk.getDocs(colRef);
          if (snapshot.empty) {
            const defaults = JSON.parse(localStorage.getItem(`rancho_${col}`)) || [];
            for (const item of defaults) {
              const docId = item.id || null;
              const docRef = docId ? 
                this.fsSdk.doc(this.fs, col, docId) : 
                this.fsSdk.doc(this.fsSdk.collection(this.fs, col));
              if (!docId && docRef.id) item.id = docRef.id;
              await this.fsSdk.setDoc(docRef, item);
            }
          } else {
            const items = [];
            snapshot.forEach(doc => {
              items.push(doc.data());
            });
            localStorage.setItem(`rancho_${col}`, JSON.stringify(items));
          }
        }
      }

      // Real-time listener for configurations to sync across visitor/admin sessions
      this.fsSdk.onSnapshot(this.fsSdk.doc(this.fs, "store_config", "current"), (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          localStorage.setItem("rancho_store_config", JSON.stringify(data));
          window.dispatchEvent(new Event("storage"));
        }
      });
    } catch (err) {
      console.error("Erro na sincronização de coleções:", err);
    }
  }

  init() {
    const initialized = localStorage.getItem("rancho_initialized");
    if (!initialized || initialized === "true" || initialized === "v2" || initialized === "v3" || initialized === "v4" || initialized === "v5") {
      // Clear legacy database if present to prevent mixing
      localStorage.removeItem("organicorp_initialized");
      
      localStorage.setItem("rancho_products", JSON.stringify(DEFAULT_PRODUCTS));
      localStorage.setItem("rancho_customers", JSON.stringify(DEFAULT_CUSTOMERS));
      localStorage.setItem("rancho_suppliers", JSON.stringify(DEFAULT_SUPPLIERS));
      localStorage.setItem("rancho_sales", JSON.stringify(DEFAULT_SALES));
      localStorage.setItem("rancho_entries", JSON.stringify(DEFAULT_ENTRY_INVOICES));
      localStorage.setItem("rancho_chats", JSON.stringify(DEFAULT_CHATS));
      localStorage.setItem("rancho_ai_config", JSON.stringify(DEFAULT_AI_CONFIG));
      localStorage.setItem("rancho_tax_config", JSON.stringify(DEFAULT_TAX_CONFIG));
      localStorage.setItem("rancho_store_config", JSON.stringify(DEFAULT_STORE_CONFIG));
      localStorage.setItem("rancho_initialized", "v6");
    }
  }

  get(key) {
    return JSON.parse(localStorage.getItem(`rancho_${key}`));
  }

  save(key, data) {
    localStorage.setItem(`rancho_${key}`, JSON.stringify(data));
    if (this.fs && this.fsSdk) {
      if (key === "store_config" || key === "tax_config") {
        const docRef = this.fsSdk.doc(this.fs, key, "current");
        this.fsSdk.setDoc(docRef, data).catch(console.error);
      }
    }
  }

  // Products CRUD
  getProducts() { return this.get("products"); }
  saveProducts(data) { this.save("products", data); }
  addProduct(product) {
    const list = this.getProducts();
    list.push(product);
    this.saveProducts(list);
    if (this.fs && this.fsSdk) {
      this.fsSdk.setDoc(this.fsSdk.doc(this.fs, "products", product.id), product).catch(console.error);
    }
  }
  updateProduct(updated) {
    const list = this.getProducts();
    const index = list.findIndex(p => p.id === updated.id);
    if (index !== -1) {
      list[index] = updated;
      this.saveProducts(list);
      if (this.fs && this.fsSdk) {
        this.fsSdk.setDoc(this.fsSdk.doc(this.fs, "products", updated.id), updated).catch(console.error);
      }
    }
  }
  deleteProduct(id) {
    const list = this.getProducts().filter(p => p.id !== id);
    this.saveProducts(list);
    if (this.fs && this.fsSdk) {
      this.fsSdk.deleteDoc(this.fsSdk.doc(this.fs, "products", id)).catch(console.error);
    }
  }

  // Customers CRUD
  getCustomers() { return this.get("customers"); }
  saveCustomers(data) { this.save("customers", data); }
  addCustomer(customer) {
    const list = this.getCustomers();
    list.push(customer);
    this.saveCustomers(list);
    if (this.fs && this.fsSdk) {
      this.fsSdk.setDoc(this.fsSdk.doc(this.fs, "customers", customer.id), customer).catch(console.error);
    }
  }
  updateCustomer(updated) {
    const list = this.getCustomers();
    const index = list.findIndex(c => c.id === updated.id);
    if (index !== -1) {
      list[index] = updated;
      this.saveCustomers(list);
      if (this.fs && this.fsSdk) {
        this.fsSdk.setDoc(this.fsSdk.doc(this.fs, "customers", updated.id), updated).catch(console.error);
      }
    }
  }
  deleteCustomer(id) {
    const list = this.getCustomers().filter(c => c.id !== id);
    this.saveCustomers(list);
    if (this.fs && this.fsSdk) {
      this.fsSdk.deleteDoc(this.fsSdk.doc(this.fs, "customers", id)).catch(console.error);
    }
  }

  // Suppliers CRUD
  getSuppliers() { return this.get("suppliers"); }
  saveSuppliers(data) { this.save("suppliers", data); }
  addSupplier(supplier) {
    const list = this.getSuppliers();
    list.push(supplier);
    this.saveSuppliers(list);
    if (this.fs && this.fsSdk) {
      this.fsSdk.setDoc(this.fsSdk.doc(this.fs, "suppliers", supplier.id), supplier).catch(console.error);
    }
  }
  updateSupplier(updated) {
    const list = this.getSuppliers();
    const index = list.findIndex(s => s.id === updated.id);
    if (index !== -1) {
      list[index] = updated;
      this.saveSuppliers(list);
      if (this.fs && this.fsSdk) {
        this.fsSdk.setDoc(this.fsSdk.doc(this.fs, "suppliers", updated.id), updated).catch(console.error);
      }
    }
  }
  deleteSupplier(id) {
    const list = this.getSuppliers().filter(s => s.id !== id);
    this.saveSuppliers(list);
    if (this.fs && this.fsSdk) {
      this.fsSdk.deleteDoc(this.fsSdk.doc(this.fs, "suppliers", id)).catch(console.error);
    }
  }

  // Sales CRUD
  getSales() { return this.get("sales"); }
  saveSales(data) { this.save("sales", data); }
  addSale(sale) {
    const list = this.getSales();
    list.unshift(sale);
    this.saveSales(list);
    if (this.fs && this.fsSdk) {
      this.fsSdk.setDoc(this.fsSdk.doc(this.fs, "sales", sale.id), sale).catch(console.error);
    }

    if (sale.customerId && sale.customerId !== "walk-in") {
      const customers = this.getCustomers();
      const cIndex = customers.findIndex(c => c.id === sale.customerId);
      if (cIndex !== -1) {
        customers[cIndex].salesCount += 1;
        customers[cIndex].totalSpent = Number((customers[cIndex].totalSpent + sale.total).toFixed(2));
        this.saveCustomers(customers);
        if (this.fs && this.fsSdk) {
          this.fsSdk.setDoc(this.fsSdk.doc(this.fs, "customers", customers[cIndex].id), customers[cIndex]).catch(console.error);
        }
      }
    }

    const products = this.getProducts();
    sale.items.forEach(item => {
      const pIndex = products.findIndex(p => p.id === item.id);
      if (pIndex !== -1) {
        products[pIndex].stock = Math.max(0, Number((products[pIndex].stock - item.qty).toFixed(1)));
        if (this.fs && this.fsSdk) {
          this.fsSdk.setDoc(this.fsSdk.doc(this.fs, "products", products[pIndex].id), products[pIndex]).catch(console.error);
        }
      }
    });
    this.saveProducts(products);
  }

  // Entry Invoices (Restock) CRUD
  getEntries() { return this.get("entries"); }
  saveEntries(data) { this.save("entries", data); }
  addEntry(entry) {
    const list = this.getEntries();
    list.unshift(entry);
    this.saveEntries(list);
    if (this.fs && this.fsSdk) {
      this.fsSdk.setDoc(this.fsSdk.doc(this.fs, "entries", entry.id), entry).catch(console.error);
    }

    // Increase product stock levels
    const products = this.getProducts();
    entry.items.forEach(item => {
      const pIndex = products.findIndex(p => p.id === item.id);
      if (pIndex !== -1) {
        products[pIndex].stock = Number((products[pIndex].stock + item.qty).toFixed(1));
        if (this.fs && this.fsSdk) {
          this.fsSdk.setDoc(this.fsSdk.doc(this.fs, "products", products[pIndex].id), products[pIndex]).catch(console.error);
        }
      }
    });
    this.saveProducts(products);
  }

  // Live Chats CRUD
  getChats() { return this.get("chats"); }
  saveChats(data) { this.save("chats", data); }
  addMessage(chatId, message) {
    const list = this.getChats();
    const chatIndex = list.findIndex(c => c.id === chatId);
    if (chatIndex !== -1) {
      list[chatIndex].messages.push(message);
      list[chatIndex].lastMsgTime = message.time;
      if (message.sender === "customer") {
        list[chatIndex].unread += 1;
      } else {
        list[chatIndex].unread = 0;
      }
      this.saveChats(list);
      if (this.fs && this.fsSdk) {
        this.fsSdk.setDoc(this.fsSdk.doc(this.fs, "chats", chatId), list[chatIndex]).catch(console.error);
      }
    }
  }
  clearUnread(chatId) {
    const list = this.getChats();
    const chatIndex = list.findIndex(c => c.id === chatId);
    if (chatIndex !== -1) {
      list[chatIndex].unread = 0;
      this.saveChats(list);
      if (this.fs && this.fsSdk) {
        this.fsSdk.setDoc(this.fsSdk.doc(this.fs, "chats", chatId), list[chatIndex]).catch(console.error);
      }
    }
  }

  resetAll() {
    localStorage.removeItem("rancho_initialized");
    this.init();
  }
}

// Attach database to window
window.db = new RanchoOrganicoDB();
