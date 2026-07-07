// Rancho Orgânico ERP Application Controller

class RanchoOrganicoApp {
  constructor() {
    this.currentView = "dashboard";
    this.cart = [];
    this.activeChatId = "chat_001";
    this.posCategoryFilter = "all";
    this.salesChart = null;
    this.fiscalSubview = "fiscal-summary";

    // Bound methods for event listeners
    this.handleProductFormSubmit = this.handleProductFormSubmit.bind(this);
    this.handleCustomerFormSubmit = this.handleCustomerFormSubmit.bind(this);
    this.handleSupplierFormSubmit = this.handleSupplierFormSubmit.bind(this);
    this.handleRestockFormSubmit = this.handleRestockFormSubmit.bind(this);
  }

  init() {
    this.initAuthGuard();
    this.setupViewRouter();
    this.setupDateBadge();
    this.setupFormSubmits();
    this.setupFiscalSubtabs();
    
    // Apply visual theme on startup
    this.applyStoreThemeOnStartup();
    
    // Initial data renders
    this.renderDashboard();
    this.renderProductsTable();
    this.renderCustomersTable();
    this.renderSuppliersTable();
    this.renderSalesTable();
    this.renderAccounting();
    
    this.initPOS();
    this.initChatWorkspace();
    this.loadAIConfigUI();
    this.setupGlobalBarcodeListener();
    this.setupStorageListener();
  }

  initAuthGuard() {
    const overlay = document.getElementById("admin-login-overlay");
    const loginBtn = document.getElementById("admin-google-login-btn");
    const errorMsg = document.getElementById("login-error-msg");

    if (loginBtn) {
      loginBtn.addEventListener("click", () => this.handleAdminLogin());
    }

    if (window.isFirebaseConfigured) {
      Promise.all([
        import("https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js"),
        import("https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js")
      ]).then(([{ initializeApp }, { getAuth, onAuthStateChanged }]) => {
        const app = initializeApp(window.firebaseConfig);
        const auth = getAuth(app);

        onAuthStateChanged(auth, (user) => {
          if (user) {
            if (user.email === "ojoaodesantocristo@gmail.com") {
              if (overlay) overlay.style.display = "none";
              if (errorMsg) errorMsg.style.display = "none";
            } else {
              import("https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js").then(({ signOut }) => {
                signOut(auth).then(() => {
                  if (overlay) overlay.style.display = "flex";
                  if (errorMsg) {
                    errorMsg.textContent = "Acesso Negado: A conta '" + user.email + "' não possui permissões administrativas.";
                    errorMsg.style.display = "block";
                  }
                });
              });
            }
          } else {
            if (overlay) overlay.style.display = "flex";
          }
        });
      }).catch(err => {
        console.error("Erro ao carregar Firebase Auth:", err);
      });
    } else {
      // Simulator Fallback Mode
      const checkLocalSession = () => {
        const userSession = JSON.parse(localStorage.getItem("rancho_user"));
        if (userSession && userSession.email === "ojoaodesantocristo@gmail.com") {
          if (overlay) overlay.style.display = "none";
        } else {
          if (overlay) overlay.style.display = "flex";
        }
      };

      checkLocalSession();

      // Listen for updates from other tabs/storefront or storage events
      window.addEventListener("storage", checkLocalSession);

      window.addEventListener("message", (event) => {
        if (event.data && event.data.type === "GOOGLE_SIGN_IN_SIMULATOR_SUCCESS") {
          const user = event.data.user;
          if (user.email === "ojoaodesantocristo@gmail.com") {
            localStorage.setItem("rancho_user", JSON.stringify(user));
            if (overlay) overlay.style.display = "none";
            if (errorMsg) errorMsg.style.display = "none";
            window.dispatchEvent(new Event("storage"));
          } else {
            localStorage.removeItem("rancho_user");
            if (overlay) overlay.style.display = "flex";
            if (errorMsg) {
              errorMsg.textContent = "Acesso Negado: A conta '" + user.email + "' (Simulada) não possui permissões administrativas.";
              errorMsg.style.display = "block";
            }
            window.dispatchEvent(new Event("storage"));
          }
        }
      });
    }
  }

  async handleAdminLogin() {
    const errorMsg = document.getElementById("login-error-msg");
    if (errorMsg) errorMsg.style.display = "none";

    if (window.isFirebaseConfigured) {
      try {
        const [{ initializeApp }, { getAuth, GoogleAuthProvider, signInWithPopup }] = await Promise.all([
          import("https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js"),
          import("https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js")
        ]);
        const app = initializeApp(window.firebaseConfig);
        const auth = getAuth(app);
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
      } catch (err) {
        if (errorMsg) {
          errorMsg.textContent = "Erro ao fazer login: " + err.message;
          errorMsg.style.display = "block";
        }
      }
    } else {
      const width = 450;
      const height = 600;
      const left = (window.screen.width / 2) - (width / 2);
      const top = (window.screen.height / 2) - (height / 2);
      
      const popup = window.open("", "Google Sign-In Simulator", `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`);
      
      if (popup) {
        popup.document.write(`
          <!DOCTYPE html>
          <html lang="pt-BR">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Fazer login com as Contas do Google</title>
            <style>
              body {
                font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                background-color: #ffffff;
                margin: 0;
                padding: 40px 20px;
                display: flex;
                flex-direction: column;
                align-items: center;
                color: #202124;
              }
              .card {
                border: 1px solid #dadce0;
                border-radius: 8px;
                max-width: 400px;
                width: 100%;
                padding: 40px 30px;
                box-sizing: border-box;
                text-align: center;
              }
              .logo {
                width: 75px;
                margin-bottom: 16px;
              }
              h1 {
                font-size: 24px;
                font-weight: 400;
                margin: 0 0 8px 0;
                color: #202124;
              }
              p {
                font-size: 16px;
                color: #5f6368;
                margin: 0 0 30px 0;
              }
              .account-item {
                display: flex;
                align-items: center;
                padding: 12px 0;
                border-bottom: 1px solid #dadce0;
                cursor: pointer;
                text-align: left;
                width: 100%;
                background: none;
                border-top: none;
                border-left: none;
                border-right: none;
              }
              .account-item:hover {
                background-color: #f8f9fa;
              }
              .avatar {
                width: 32px;
                height: 32px;
                border-radius: 50%;
                margin-right: 12px;
                background-color: #4d7c0f;
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
              }
              .account-info {
                flex-grow: 1;
              }
              .name {
                font-size: 14px;
                font-weight: 500;
                color: #3c4043;
              }
              .email {
                font-size: 12px;
                color: #5f6368;
              }
              .footer {
                margin-top: 30px;
                font-size: 11px;
                color: #5f6368;
                line-height: 1.4;
              }
            </style>
          </head>
          <body>
            <div class="card">
              <img class="logo" src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google">
              <h1>Escolha uma conta</h1>
              <p>para continuar no Rancho Orgânico</p>
              
              <button class="account-item" onclick="selectAccount('João de Santo Cristo', 'ojoaodesantocristo@gmail.com', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=80')">
                <div class="avatar" style="background-color: #4d7c0f;">J</div>
                <div class="account-info">
                  <div class="name">João de Santo Cristo (Admin)</div>
                  <div class="email">ojoaodesantocristo@gmail.com</div>
                </div>
              </button>

              <button class="account-item" onclick="selectAccount('Maria Silva', 'mariasilva@gmail.com', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=80')">
                <div class="avatar" style="background-color: #0369a1;">M</div>
                <div class="account-info">
                  <div class="name">Maria Silva (Cliente/Visitante)</div>
                  <div class="email">mariasilva@gmail.com</div>
                </div>
              </button>
              
              <div class="footer">
                Para continuar, o Google compartilhará seu nome, endereço de e-mail, foto do perfil e preferência de idioma com o Rancho Orgânico.
              </div>
            </div>

            <script>
              function selectAccount(name, email, photo) {
                window.opener.postMessage({
                  type: 'GOOGLE_SIGN_IN_SIMULATOR_SUCCESS',
                  user: {
                    uid: 'mock-' + Math.random().toString(36).substr(2, 9),
                    displayName: name,
                    email: email,
                    photoURL: photo
                  }
                }, '*');
                window.close();
              }
            <\/script>
          </body>
          </html>
        `);
      }
    }
  }

  // SPA View Routing
  setupViewRouter() {
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach(item => {
      item.addEventListener("click", () => {
        const targetView = item.getAttribute("data-view");
        this.switchView(targetView);
      });
    });
  }

  switchView(viewName) {
    this.currentView = viewName;
    
    // Update active nav item
    document.querySelectorAll(".nav-item").forEach(item => {
      if (item.getAttribute("data-view") === viewName) {
        item.classList.add("active");
        item.setAttribute("aria-current", "page");
      } else {
        item.classList.remove("active");
        item.removeAttribute("aria-current");
      }
    });

    // Toggle view panels
    document.querySelectorAll(".view-panel").forEach(panel => {
      if (panel.id === `${viewName}-view`) {
        panel.classList.add("active");
      } else {
        panel.classList.remove("active");
      }
    });

    // Refresh view specific data
    if (viewName === "dashboard") {
      this.renderDashboard();
    } else if (viewName === "pos") {
      this.initPOS();
    } else if (viewName === "sales-history") {
      this.renderSalesTable();
    } else if (viewName === "accounting") {
      this.renderAccounting();
    } else if (viewName === "whatsapp-ai") {
      this.initChatWorkspace();
    } else if (viewName === "products") {
      this.renderProductsTable();
    } else if (viewName === "store-settings") {
      this.loadStoreConfigUI();
    }
  }

  setupDateBadge() {
    const badge = document.getElementById("current-date-badge");
    if (badge) {
      const now = new Date("2026-07-06T02:11:03-03:00");
      badge.textContent = now.toLocaleDateString("pt-BR", {
        day: "numeric", month: "short", year: "numeric"
      });
    }
  }

  // Dashboard Page rendering
  renderDashboard() {
    const sales = window.db.getSales();
    const products = window.db.getProducts();
    const customers = window.db.getCustomers();

    // 1. KPI Calculations
    const revenue = sales
      .filter(s => s.status !== "Cancelado")
      .reduce((sum, s) => sum + s.total, 0);
    
    const totalSalesCount = sales.length;
    const avgTicket = totalSalesCount > 0 ? (revenue / totalSalesCount) : 0;
    const activeClientsCount = customers.filter(c => c.status === "Ativo").length;

    document.getElementById("kpi-revenue").textContent = this.formatCurrency(revenue);
    document.getElementById("kpi-sales-count").textContent = totalSalesCount;
    document.getElementById("kpi-avg-ticket").textContent = this.formatCurrency(avgTicket);
    document.getElementById("kpi-active-clients").textContent = activeClientsCount;

    // 2. Alert Generation (Expiration & Stock levels)
    const alertsList = document.getElementById("dashboard-alerts");
    alertsList.innerHTML = "";

    const todayStr = "2026-07-06";
    const today = new Date(todayStr);

    products.forEach(p => {
      // Stock warning
      if (p.stock <= 10) {
        const item = document.createElement("div");
        item.className = `alert-item ${p.stock <= 3 ? 'danger' : 'warning'}`;
        item.innerHTML = `
          <i class="fa-solid fa-triangle-exclamation"></i>
          <div class="alert-info">
            <h4>Estoque Baixo: ${p.name}</h4>
            <p>Apenas ${p.stock} ${p.unit} restantes no estoque principal.</p>
          </div>
        `;
        alertsList.appendChild(item);
      }

      // Expiration warning (Organic shelf-life is short)
      const expDate = new Date(p.expirationDate);
      const diffTime = expDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays <= 3 && diffDays >= 0) {
        const item = document.createElement("div");
        item.className = "alert-item danger";
        item.innerHTML = `
          <i class="fa-solid fa-clock-rotate-left"></i>
          <div class="alert-info">
            <h4>Vencimento Próximo: ${p.name}</h4>
            <p>Vence em ${diffDays} ${diffDays === 1 ? 'dia' : 'dias'} (${p.expirationDate}). Reduzir preço!</p>
          </div>
        `;
        alertsList.appendChild(item);
      }
    });

    if (alertsList.innerHTML === "") {
      alertsList.innerHTML = `
        <div style="text-align: center; padding: 24px; color: var(--text-muted);">
          <i class="fa-solid fa-circle-check" style="font-size: 2rem; color: var(--color-success); margin-bottom: 8px; display: block;"></i>
          Nenhum alerta pendente no momento. Tudo em ordem!
        </div>
      `;
    }

    // 3. Recent Sales Table
    const recentSalesTbody = document.getElementById("recent-sales-tbody");
    recentSalesTbody.innerHTML = "";
    
    sales.slice(0, 5).forEach(s => {
      const tr = document.createElement("tr");
      
      let badgeClass = "badge-info";
      if (s.status === "Entregue") badgeClass = "badge-success";
      if (s.status === "Preparando") badgeClass = "badge-warning";
      if (s.status === "Cancelado") badgeClass = "badge-danger";

      const itemsStr = s.items.map(i => `${i.qty}x ${i.name}`).join(", ");

      tr.innerHTML = `
        <td><strong>#${s.id}</strong></td>
        <td>${this.formatDateTime(s.date)}</td>
        <td>${s.customerName}</td>
        <td><span style="font-size: 0.8rem; display: block; max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${itemsStr}">${itemsStr}</span></td>
        <td><strong>${this.formatCurrency(s.total)}</strong></td>
        <td><span class="badge ${s.channel === 'iFood' ? 'badge-danger' : s.channel === 'WhatsApp' ? 'badge-success' : 'badge-info'}">${s.channel}</span></td>
        <td><span class="badge ${badgeClass}">${s.status}</span></td>
      `;
      recentSalesTbody.appendChild(tr);
    });

    // 4. Render Chart.js
    this.renderCharts(sales);
  }

  // Draw Dashboard Sales Channels Chart
  renderCharts(sales) {
    const chartCanvas = document.getElementById("salesChannelChart");
    if (!chartCanvas) return;

    // Calculate channels total revenue
    const channels = { "Balcão": 0, "WhatsApp": 0, "iFood": 0, "CardapioFacil": 0 };
    sales.filter(s => s.status !== "Cancelado").forEach(s => {
      if (channels[s.channel] !== undefined) {
        channels[s.channel] += s.total;
      }
    });

    const data = Object.values(channels);
    const labels = Object.keys(channels);

    if (this.salesChart) {
      this.salesChart.destroy();
    }

    this.salesChart = new Chart(chartCanvas, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: [
            '#4d7c0f', // Balcão - Lime Green
            '#25d366', // WhatsApp - Green
            '#ea1d2c', // iFood - Red
            '#0b57d0'  // CardapioFacil - Blue
          ],
          borderColor: '#ffffff',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: 'var(--text-primary)',
              font: { family: 'Plus Jakarta Sans', size: 12 }
            }
          },
          tooltip: {
            callbacks: {
              label: (context) => ` R$ ${context.parsed.toFixed(2)}`
            }
          }
        }
      }
    });
  }

  // PRODUCTS MANAGEMENT
  renderProductsTable() {
    const tbody = document.getElementById("products-tbody");
    if (!tbody) return;

    tbody.innerHTML = "";
    const list = window.db.getProducts();
    const query = document.getElementById("product-search").value.toLowerCase();
    const certFilter = document.getElementById("product-filter-cert").value;

    list.forEach(p => {
      // Apply filters
      const matchesSearch = p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query);
      const matchesCert = certFilter === "all" || p.organicCert === certFilter;

      if (matchesSearch && matchesCert) {
        const tr = document.createElement("tr");

        let certBadge = "badge-success";
        if (p.organicCert === "Em Transição") certBadge = "badge-warning";
        if (p.organicCert === "Não Certificado") certBadge = "badge-danger";

        const imgHtml = p.imageUrl ? `<img src="${p.imageUrl}" alt="${p.name}" style="width: 28px; height: 28px; object-fit: cover; border-radius: var(--radius-sm); border: 1px solid var(--border-color); vertical-align: middle; margin-right: 8px;">` : `<i class="fa-solid fa-carrot" style="color: var(--text-muted); margin-right: 8px;"></i>`;

        tr.innerHTML = `
          <td>${p.id}</td>
          <td>${imgHtml} <strong>${p.name}</strong></td>
          <td>${p.category}</td>
          <td><span style="font-weight: 600; color: ${p.stock <= 5 ? 'var(--color-danger)' : 'inherit'}">${p.stock}</span></td>
          <td>${p.unit}</td>
          <td>${this.formatCurrency(p.cost)}</td>
          <td><strong>${this.formatCurrency(p.price)}</strong></td>
          <td>${p.expirationDate}</td>
          <td><span class="badge ${certBadge}">${p.organicCert}</span></td>
          <td>
            <button class="btn btn-secondary btn-sm" onclick="app.openProductModal('${p.id}')" title="Editar"><i class="fa-solid fa-pen"></i></button>
            <button class="btn btn-danger btn-sm" onclick="app.deleteProduct('${p.id}')" title="Excluir"><i class="fa-solid fa-trash"></i></button>
          </td>
        `;
        tbody.appendChild(tr);
      }
    });
  }

  openProductModal(id = "") {
    const modal = document.getElementById("product-modal");
    const form = document.getElementById("product-form");
    const title = document.getElementById("product-modal-title");
    
    // Populate suppliers dropdown
    const supplierSelect = document.getElementById("form-p-supplier");
    supplierSelect.innerHTML = "";
    window.db.getSuppliers().forEach(s => {
      const opt = document.createElement("option");
      opt.value = s.id;
      opt.textContent = s.name;
      supplierSelect.appendChild(opt);
    });

    // Populate categories autocomplete datalist dynamically
    const datalist = document.getElementById("categories-list");
    if (datalist) {
      datalist.innerHTML = "";
      const products = window.db.getProducts();
      const uniqueCats = [...new Set(products.map(p => p.category).filter(Boolean))];
      uniqueCats.forEach(cat => {
        const opt = document.createElement("option");
        opt.value = cat;
        datalist.appendChild(opt);
      });
    }

    const fileInput = document.getElementById("form-p-image-file");
    const preview = document.getElementById("form-p-image-preview");
    const base64Input = document.getElementById("form-p-image-base64");
    
    if (fileInput) fileInput.value = "";

    if (id) {
      title.textContent = "Editar Produto Orgânico";
      const product = window.db.getProducts().find(p => p.id === id);
      if (product) {
        document.getElementById("product-id-field").value = product.id;
        document.getElementById("form-p-name").value = product.name;
        document.getElementById("form-p-category").value = product.category;
        document.getElementById("form-p-unit").value = product.unit;
        document.getElementById("form-p-stock").value = product.stock;
        document.getElementById("form-p-expiration").value = product.expirationDate;
        document.getElementById("form-p-cost").value = product.cost;
        document.getElementById("form-p-price").value = product.price;
        document.getElementById("form-p-cert").value = product.organicCert;
        document.getElementById("form-p-supplier").value = product.supplierId;
        
        base64Input.value = product.imageUrl || "";
        if (product.imageUrl) {
          preview.src = product.imageUrl;
          preview.style.display = "block";
        } else {
          preview.style.display = "none";
        }
        document.getElementById("form-p-video").value = product.videoUrl || "";
      }
    } else {
      title.textContent = "Novo Produto Orgânico";
      form.reset();
      document.getElementById("product-id-field").value = "";
      base64Input.value = "";
      if (preview) preview.style.display = "none";
      document.getElementById("form-p-video").value = "";
    }
    
    modal.showModal();
  }

  closeProductModal() {
    document.getElementById("product-modal").close();
  }

  setupFormSubmits() {
    document.getElementById("product-form").addEventListener("submit", this.handleProductFormSubmit);
    document.getElementById("customer-form").addEventListener("submit", this.handleCustomerFormSubmit);
    document.getElementById("supplier-form").addEventListener("submit", this.handleSupplierFormSubmit);
    document.getElementById("restock-form").addEventListener("submit", this.handleRestockFormSubmit);

    // Listen to local photo files uploads and encode to base64
    const fileInput = document.getElementById("form-p-image-file");
    if (fileInput) {
      fileInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const base64 = event.target.result;
            document.getElementById("form-p-image-base64").value = base64;
            const preview = document.getElementById("form-p-image-preview");
            if (preview) {
              preview.src = base64;
              preview.style.display = "block";
            }
          };
          reader.readAsDataURL(file);
        }
      });
    }
  }

  handleProductFormSubmit(e) {
    e.preventDefault();
    const id = document.getElementById("product-id-field").value;
    const name = document.getElementById("form-p-name").value;
    const category = document.getElementById("form-p-category").value;
    const unit = document.getElementById("form-p-unit").value;
    const stock = Number(document.getElementById("form-p-stock").value);
    const expirationDate = document.getElementById("form-p-expiration").value;
    const cost = Number(document.getElementById("form-p-cost").value);
    const price = Number(document.getElementById("form-p-price").value);
    const organicCert = document.getElementById("form-p-cert").value;
    const supplierId = document.getElementById("form-p-supplier").value;
    const imageUrl = document.getElementById("form-p-image-base64").value;
    const videoUrl = document.getElementById("form-p-video").value;

    const dataObj = { id, name, category, unit, stock, expirationDate, cost, price, organicCert, supplierId, ncm: "0709.99.90", imageUrl, videoUrl };

    if (id) {
      window.db.updateProduct(dataObj);
    } else {
      const products = window.db.getProducts();
      const lastIdNum = products.length > 0 ? parseInt(products[products.length - 1].id.substring(1)) : 0;
      dataObj.id = `P${String(lastIdNum + 1).padStart(3, '0')}`;
      window.db.addProduct(dataObj);
    }
    
    this.closeProductModal();
    this.renderProductsTable();
  }

  deleteProduct(id) {
    if (confirm("Tem certeza que deseja remover este produto orgânico?")) {
      window.db.deleteProduct(id);
      this.renderProductsTable();
    }
  }

  // CUSTOMERS MANAGEMENT
  renderCustomersTable() {
    const tbody = document.getElementById("customers-tbody");
    if (!tbody) return;

    tbody.innerHTML = "";
    const list = window.db.getCustomers();
    const query = document.getElementById("customer-search").value.toLowerCase();

    list.forEach(c => {
      if (c.name.toLowerCase().includes(query) || c.phone.includes(query) || c.email.toLowerCase().includes(query)) {
        const tr = document.createElement("tr");
        tr.style.cursor = "pointer";
        tr.onclick = (e) => {
          if (e.target.tagName !== "BUTTON" && e.target.closest("button") === null) {
            this.showCustomerDetail(c.id);
          }
        };

        tr.innerHTML = `
          <td>${c.id}</td>
          <td>
            <strong>${c.name}</strong><br>
            <span style="font-size: 0.72rem; color: var(--text-muted); font-weight: 500;">CPF/CNPJ: ${c.document || '-'}</span>
          </td>
          <td>${c.phone}</td>
          <td>${c.email}</td>
          <td><span style="font-size: 0.8rem; display: block; max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${c.address}">${c.address}</span></td>
          <td>${c.salesCount}</td>
          <td><strong>${this.formatCurrency(c.totalSpent)}</strong></td>
          <td>
            <button class="btn btn-secondary btn-sm" onclick="app.openCustomerModal('${c.id}')" title="Editar"><i class="fa-solid fa-pen"></i></button>
            <button class="btn btn-danger btn-sm" onclick="app.deleteCustomer('${c.id}')" title="Excluir"><i class="fa-solid fa-trash"></i></button>
          </td>
        `;
        tbody.appendChild(tr);
      }
    });
  }

  openCustomerModal(id = "") {
    const modal = document.getElementById("customer-modal");
    const form = document.getElementById("customer-form");
    const title = document.getElementById("customer-modal-title");

    if (id) {
      title.textContent = "Editar Cadastro de Cliente";
      const customer = window.db.getCustomers().find(c => c.id === id);
      if (customer) {
        document.getElementById("customer-id-field").value = customer.id;
        document.getElementById("form-c-name").value = customer.name;
        document.getElementById("form-c-phone").value = customer.phone;
        document.getElementById("form-c-email").value = customer.email;
        document.getElementById("form-c-address").value = customer.address;
        document.getElementById("form-c-doc").value = customer.document || "";
      }
    } else {
      title.textContent = "Novo Cliente";
      form.reset();
      document.getElementById("customer-id-field").value = "";
      document.getElementById("form-c-doc").value = "";
    }
    modal.showModal();
  }

  closeCustomerModal() {
    document.getElementById("customer-modal").close();
  }

  handleCustomerFormSubmit(e) {
    e.preventDefault();
    const id = document.getElementById("customer-id-field").value;
    const name = document.getElementById("form-c-name").value;
    const phone = document.getElementById("form-c-phone").value;
    const email = document.getElementById("form-c-email").value;
    const address = document.getElementById("form-c-address").value;
    const documentVal = document.getElementById("form-c-doc").value;

    const dataObj = { id, name, phone, email, address, document: documentVal };

    if (id) {
      const original = window.db.getCustomers().find(c => c.id === id);
      dataObj.registrationDate = original.registrationDate;
      dataObj.status = original.status;
      dataObj.salesCount = original.salesCount;
      dataObj.totalSpent = original.totalSpent;
      window.db.updateCustomer(dataObj);
    } else {
      const customers = window.db.getCustomers();
      const lastIdNum = customers.length > 0 ? parseInt(customers[customers.length - 1].id.substring(1)) : 0;
      dataObj.id = `C${String(lastIdNum + 1).padStart(3, '0')}`;
      dataObj.registrationDate = new Date().toISOString().split('T')[0];
      dataObj.status = "Ativo";
      dataObj.salesCount = 0;
      dataObj.totalSpent = 0.00;
      window.db.addCustomer(dataObj);
    }
    
    this.closeCustomerModal();
    this.renderCustomersTable();
  }

  showCustomerDetail(id) {
    const customer = window.db.getCustomers().find(c => c.id === id);
    if (!customer) return;

    // Get client purchase history
    const allSales = window.db.getSales();
    const clientSales = allSales.filter(s => s.customerId === id);

    // Calculate advanced consumption stats
    const totalSpent = clientSales.reduce((sum, s) => sum + s.total, 0);
    const orderCount = clientSales.length;
    const avgTicket = orderCount > 0 ? totalSpent / orderCount : 0;

    // Category frequency calculation
    const catFreq = {};
    let totalTaxSavings = 0;
    
    clientSales.forEach(s => {
      s.items.forEach(item => {
        const prod = window.db.getProducts().find(p => p.id === item.id);
        const cat = prod ? prod.category : "Outros";
        catFreq[cat] = (catFreq[cat] || 0) + item.qty;

        if (item.csosn === "400") {
          totalTaxSavings += item.total * 0.0204;
        }
      });
    });

    let prefCategory = "Nenhum";
    let maxQty = 0;
    for (const [cat, qty] of Object.entries(catFreq)) {
      if (qty > maxQty) {
        maxQty = qty;
        prefCategory = cat;
      }
    }
    if (prefCategory !== "Nenhum" && orderCount > 0) {
      prefCategory = `${prefCategory} (Consumo Alto)`;
    }

    // Populate modal fields
    document.getElementById("detail-c-name").textContent = customer.name;
    document.getElementById("detail-c-doc").textContent = customer.document || "Não Cadastrado";
    document.getElementById("detail-c-phone").textContent = customer.phone;
    document.getElementById("detail-c-email").textContent = customer.email;
    document.getElementById("detail-c-address").textContent = customer.address;
    document.getElementById("detail-c-date").textContent = customer.registrationDate;

    const statusBadge = document.getElementById("detail-c-status");
    statusBadge.textContent = customer.status || "Ativo";
    statusBadge.className = `badge ${customer.status === 'Inativo' ? 'badge-danger' : 'badge-success'}`;

    document.getElementById("detail-c-spent").textContent = this.formatCurrency(totalSpent);
    document.getElementById("detail-c-count").textContent = orderCount;
    document.getElementById("detail-c-avg").textContent = this.formatCurrency(avgTicket);
    document.getElementById("detail-c-pref").textContent = prefCategory;
    document.getElementById("detail-c-saving").textContent = totalTaxSavings > 0 ? `R$ ${totalTaxSavings.toFixed(2)} economizados` : "R$ 0,00";

    const tableBody = document.getElementById("detail-c-orders");
    tableBody.innerHTML = "";

    if (clientSales.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted); padding: 24px;">Nenhuma compra registrada para este cliente.</td></tr>`;
    } else {
      clientSales.forEach(s => {
        const tr = document.createElement("tr");
        const dateFormatted = new Date(s.date).toLocaleDateString('pt-BR');
        
        tr.innerHTML = `
          <td><strong>#${s.id}</strong> / NF: ${s.invoiceNumber || '-'}</td>
          <td>${dateFormatted}</td>
          <td><strong>${this.formatCurrency(s.total)}</strong></td>
          <td><span class="badge badge-info" style="font-size: 0.7rem; padding: 2px 6px;">${s.channel}</span></td>
          <td>
            <button class="btn btn-secondary btn-xs" onclick="app.openDanfeModal('${s.id}', 'saida')" style="font-size: 0.7rem; padding: 2px 6px;">
              <i class="fa-solid fa-file-invoice"></i> DANFE
            </button>
          </td>
        `;
        tableBody.appendChild(tr);
      });
    }

    document.getElementById("customer-detail-modal").showModal();
  }

  deleteCustomer(id) {
    if (confirm("Tem certeza que deseja remover este cliente?")) {
      window.db.deleteCustomer(id);
      this.renderCustomersTable();
    }
  }

  // SUPPLIERS MANAGEMENT
  renderSuppliersTable() {
    const tbody = document.getElementById("suppliers-tbody");
    if (!tbody) return;

    tbody.innerHTML = "";
    const list = window.db.getSuppliers();
    const query = document.getElementById("supplier-search").value.toLowerCase();

    list.forEach(s => {
      if (s.name.toLowerCase().includes(query) || s.contactPerson.toLowerCase().includes(query) || s.productsSupplied.toLowerCase().includes(query)) {
        const tr = document.createElement("tr");

        let certBadge = "badge-success";
        if (s.certificationStatus === "Auditoria") certBadge = "badge-info";
        if (s.certificationStatus === "Cadastrado") certBadge = "badge-warning";

        tr.innerHTML = `
          <td>${s.id}</td>
          <td>
            <strong>${s.name}</strong><br>
            <span style="font-size: 0.72rem; color: var(--text-muted); font-weight: 500;">CNPJ: ${s.cnpj || '-'} | IE: ${s.stateInscr || '-'}</span>
          </td>
          <td>${s.contactPerson}</td>
          <td>${s.phone}</td>
          <td>${s.email}</td>
          <td>${s.productsSupplied}</td>
          <td><span class="badge ${certBadge}">${s.certificationStatus}</span></td>
          <td>
            <button class="btn btn-secondary btn-sm" onclick="app.openSupplierModal('${s.id}')"><i class="fa-solid fa-pen"></i></button>
            <button class="btn btn-danger btn-sm" onclick="app.deleteSupplier('${s.id}')"><i class="fa-solid fa-trash"></i></button>
          </td>
        `;
        tbody.appendChild(tr);
      }
    });
  }

  openSupplierModal(id = "") {
    const modal = document.getElementById("supplier-modal");
    const form = document.getElementById("supplier-form");
    const title = document.getElementById("supplier-modal-title");

    if (id) {
      title.textContent = "Editar Fornecedor Orgânico";
      const supplier = window.db.getSuppliers().find(s => s.id === id);
      if (supplier) {
        document.getElementById("supplier-id-field").value = supplier.id;
        document.getElementById("form-s-name").value = supplier.name;
        document.getElementById("form-s-person").value = supplier.contactPerson;
        document.getElementById("form-s-cert").value = supplier.certificationStatus;
        document.getElementById("form-s-phone").value = supplier.phone;
        document.getElementById("form-s-email").value = supplier.email;
        document.getElementById("form-s-address").value = supplier.address;
        document.getElementById("form-s-products").value = supplier.productsSupplied;
        document.getElementById("form-s-cnpj").value = supplier.cnpj || "";
        document.getElementById("form-s-ie").value = supplier.stateInscr || "";
      }
    } else {
      title.textContent = "Novo Fornecedor Parceiro";
      form.reset();
      document.getElementById("supplier-id-field").value = "";
      document.getElementById("form-s-cnpj").value = "";
      document.getElementById("form-s-ie").value = "";
    }
    modal.showModal();
  }

  closeSupplierModal() {
    document.getElementById("supplier-modal").close();
  }

  handleSupplierFormSubmit(e) {
    e.preventDefault();
    const id = document.getElementById("supplier-id-field").value;
    const name = document.getElementById("form-s-name").value;
    const contactPerson = document.getElementById("form-s-person").value;
    const certificationStatus = document.getElementById("form-s-cert").value;
    const phone = document.getElementById("form-s-phone").value;
    const email = document.getElementById("form-s-email").value;
    const address = document.getElementById("form-s-address").value;
    const productsSupplied = document.getElementById("form-s-products").value;
    const cnpjVal = document.getElementById("form-s-cnpj").value;
    const ieVal = document.getElementById("form-s-ie").value;

    const dataObj = { id, name, contactPerson, certificationStatus, phone, email, address, productsSupplied, cnpj: cnpjVal, stateInscr: ieVal };

    if (id) {
      window.db.updateSupplier(dataObj);
    } else {
      const suppliers = window.db.getSuppliers();
      const lastIdNum = suppliers.length > 0 ? parseInt(suppliers[suppliers.length - 1].id.substring(1)) : 0;
      dataObj.id = `S${String(lastIdNum + 1).padStart(3, '0')}`;
      window.db.addSupplier(dataObj);
    }
    
    this.closeSupplierModal();
    this.renderSuppliersTable();
  }

  deleteSupplier(id) {
    if (confirm("Tem certeza que deseja remover este fornecedor parceiro?")) {
      window.db.deleteSupplier(id);
      this.renderSuppliersTable();
    }
  }

  // SALES POS SYSTEM
  initPOS() {
    this.renderPOSCategoryTabs();
    this.filterPOSProducts();
    this.populatePOSCustomerDropdown();
    this.renderPOSCart();
  }

  populatePOSCustomerDropdown() {
    const select = document.getElementById("pos-customer-select");
    if (!select) return;

    select.innerHTML = '<option value="walk-in">Cliente Balcão (Não Identificado)</option>';
    
    window.db.getCustomers().forEach(c => {
      const opt = document.createElement("option");
      opt.value = c.id;
      opt.textContent = `${c.name} (${c.phone})`;
      select.appendChild(opt);
    });
  }

  renderPOSCategoryTabs() {
    const container = document.getElementById("pos-category-tabs");
    if (!container) return;

    container.innerHTML = "";
    const products = window.db.getProducts();
    // Dynamically calculate unique categories from existing products
    const categories = ["all", ...new Set(products.map(p => p.category).filter(Boolean))];
    
    categories.forEach(cat => {
      const btn = document.createElement("button");
      btn.className = `category-tab ${this.posCategoryFilter === cat ? 'active' : ''}`;
      btn.textContent = cat === "all" ? "Todos" : cat;
      btn.onclick = () => {
        this.posCategoryFilter = cat;
        this.renderPOSCategoryTabs();
        this.filterPOSProducts();
      };
      container.appendChild(btn);
    });
  }

  filterPOSProducts() {
    const grid = document.getElementById("pos-products-grid");
    if (!grid) return;

    grid.innerHTML = "";
    const list = window.db.getProducts();
    const query = document.getElementById("pos-search-input").value.toLowerCase();

    list.forEach(p => {
      if (p.stock <= 0) return;

      const matchesSearch = p.name.toLowerCase().includes(query);
      const matchesCat = this.posCategoryFilter === "all" || p.category === this.posCategoryFilter;

      if (matchesSearch && matchesCat) {
        const card = document.createElement("div");
        card.className = "pos-item-card";
        card.style.display = "flex";
        card.style.flexDirection = "column";
        card.style.justifyContent = "space-between";
        card.style.padding = "0";
        card.style.overflow = "hidden";
        card.onclick = () => this.addToCart(p);

        const imgHtml = p.imageUrl ? `<img src="${p.imageUrl}" alt="${p.name}" style="width: 100%; height: 100px; object-fit: cover; border-bottom: 1px solid var(--border-color);">` : '';
        const bodyPaddingStyle = p.imageUrl ? 'padding: 12px;' : 'padding: 16px;';

        card.innerHTML = `
          ${imgHtml}
          <div style="${bodyPaddingStyle} flex-grow: 1; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div class="pos-item-title" style="margin-bottom: 4px;">${p.name}</div>
              <div class="pos-item-cert"><i class="fa-solid fa-certificate"></i> ${p.organicCert}</div>
            </div>
            <div class="pos-item-footer" style="margin-top: 12px; display: flex; justify-content: space-between; align-items: center;">
              <span class="pos-item-price">R$ ${p.price.toFixed(2)}</span>
              <span class="pos-item-stock">${p.stock} ${p.unit}</span>
            </div>
          </div>
        `;
        grid.appendChild(card);
      }
    });
  }

  setupGlobalBarcodeListener() {
    document.addEventListener("keydown", (e) => {
      if (this.currentView !== "pos") return;
      
      const activeEl = document.activeElement;
      const isInput = activeEl.tagName === "INPUT" || activeEl.tagName === "TEXTAREA" || activeEl.tagName === "SELECT";
      
      if (!isInput) {
        const barcodeInput = document.getElementById("pos-barcode-input");
        if (barcodeInput) {
          barcodeInput.focus();
        }
      }
    });
  }

  setupStorageListener() {
    window.addEventListener("storage", (e) => {
      if (e.key && e.key.startsWith("rancho_")) {
        console.log("Banco de dados atualizado em outra janela. Atualizando painel...");
        if (this.currentView === "dashboard") {
          this.renderDashboard();
        } else if (this.currentView === "sales-history") {
          this.renderSalesTable();
        } else if (this.currentView === "accounting") {
          this.renderAccounting();
        } else if (this.currentView === "whatsapp-ai") {
          this.initChatWorkspace();
        } else if (this.currentView === "products") {
          this.renderProductsTable();
        }
      }
    });
  }

  handleBarcodeInput(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      const barcodeVal = e.target.value.trim();
      if (!barcodeVal) return;

      const products = window.db.getProducts();
      const product = products.find(p => p.barcode === barcodeVal || p.id.toLowerCase() === barcodeVal.toLowerCase());

      if (product) {
        if (product.stock > 0) {
          this.addToCart(product);
          this.playBeep();
          e.target.value = "";
        } else {
          alert(`Produto "${product.name}" está esgotado!`);
          e.target.value = "";
        }
      } else {
        alert(`Código "${barcodeVal}" não cadastrado no Rancho!`);
        e.target.value = "";
      }
    }
  }

  playBeep() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = 1300;
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.005, ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch (err) {
      console.log("AudioContext blocked.");
    }
  }

  addToCart(product) {
    const existing = this.cart.find(item => item.id === product.id);
    if (existing) {
      if (existing.qty < product.stock) {
        existing.qty += 1;
      } else {
        alert("Quantidade máxima em estoque atingida!");
      }
    } else {
      this.cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        qty: 1,
        unit: product.unit,
        organicCert: product.organicCert
      });
    }
    this.renderPOSCart();
  }

  updateQty(productId, amount) {
    const itemIndex = this.cart.findIndex(i => i.id === productId);
    if (itemIndex !== -1) {
      const item = this.cart[itemIndex];
      const product = window.db.getProducts().find(p => p.id === productId);

      item.qty += amount;
      if (item.qty <= 0) {
        this.cart.splice(itemIndex, 1);
      } else if (item.qty > product.stock) {
        alert("Estoque insuficiente!");
        item.qty = product.stock;
      }
      this.renderPOSCart();
    }
  }

  clearCart() {
    this.cart = [];
    this.renderPOSCart();
  }

  renderPOSCart() {
    const container = document.getElementById("pos-cart-items");
    if (!container) return;

    container.innerHTML = "";
    
    let subtotal = 0;
    let totalTaxSaved = 0;
    
    const taxRules = window.db.get("tax_config") || { baseTaxRate: 6.0, organicDiscount: 2.04 };

    this.cart.forEach(item => {
      const totalItem = item.price * item.qty;
      subtotal += totalItem;

      if (item.organicCert === "Certificado") {
        const stdTax = totalItem * (taxRules.baseTaxRate / 100);
        const orgTax = totalItem * ((taxRules.baseTaxRate - taxRules.organicDiscount) / 100);
        totalTaxSaved += (stdTax - orgTax); // ICMS exemption benefits
      }

      const div = document.createElement("div");
      div.className = "cart-item";
      div.innerHTML = `
        <div>
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">${item.qty} x R$ ${item.price.toFixed(2)}</div>
        </div>
        <div class="cart-qty-ctrl">
          <button class="cart-qty-btn" onclick="app.updateQty('${item.id}', -1)">-</button>
          <span>${item.qty}</span>
          <button class="cart-qty-btn" onclick="app.updateQty('${item.id}', 1)">+</button>
          <span class="cart-item-total">R$ ${totalItem.toFixed(2)}</span>
        </div>
      `;
      container.appendChild(div);
    });

    const taxAmount = subtotal * (taxRules.baseTaxRate / 100) - totalTaxSaved;
    const finalTotal = subtotal;

    document.getElementById("pos-subtotal").textContent = this.formatCurrency(subtotal);
    document.getElementById("pos-taxes").textContent = this.formatCurrency(taxAmount);

    const savingsRow = document.getElementById("pos-savings-row");
    const savingsAmt = document.getElementById("pos-savings-amount");
    if (totalTaxSaved > 0) {
      savingsRow.style.display = "flex";
      savingsAmt.textContent = this.formatCurrency(totalTaxSaved);
    } else {
      savingsRow.style.display = "none";
    }

    document.getElementById("pos-total").textContent = this.formatCurrency(finalTotal);
  }

  checkoutPOS() {
    if (this.cart.length === 0) {
      alert("Carrinho vazio! Adicione produtos para prosseguir.");
      return;
    }

    const cSelect = document.getElementById("pos-customer-select");
    const channelSelect = document.getElementById("pos-channel-select");

    const customerId = cSelect.value;
    let customerName = "Cliente Balcão";
    if (customerId !== "walk-in") {
      const c = window.db.getCustomers().find(cust => cust.id === customerId);
      if (c) customerName = c.name;
    }

    const channel = channelSelect.value;
    const sales = window.db.getSales();
    const lastIdNum = sales.length > 0 ? parseInt(sales[0].id.substring(1)) : 0;
    const newId = `V${String(lastIdNum + 1).padStart(3, '0')}`;
    const invoiceNum = String(10020 + lastIdNum + 1);

    const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const taxRules = window.db.get("tax_config");
    let totalTaxSaved = 0;
    
    // Attach tax codes CFOP/CSOSN to each item
    const checkoutItems = this.cart.map(item => {
      const isOrganic = item.organicCert === "Certificado";
      if (isOrganic) {
        totalTaxSaved += (item.price * item.qty) * (taxRules.organicDiscount / 100);
      }
      return {
        id: item.id,
        name: item.name,
        price: item.price,
        qty: item.qty,
        total: item.price * item.qty,
        cfop: channel === "Balcão" ? "5.102" : "5.106",
        csosn: isOrganic ? "400" : "102"
      };
    });

    const finalTax = Math.max(0, subtotal * (taxRules.baseTaxRate / 100) - totalTaxSaved);
    const accessKeyStr = `35260712345678000190650010000${invoiceNum}${Math.floor(100000 + Math.random() * 900000)}`;

    const newSale = {
      id: newId,
      date: new Date().toISOString(),
      customerId: customerId,
      customerName: customerName,
      items: checkoutItems,
      total: subtotal,
      taxAmount: Number(finalTax.toFixed(2)),
      channel: channel,
      status: "Entregue",
      invoiceNumber: invoiceNum,
      cfop: channel === "Balcão" ? "5.102" : "5.106",
      csosn: "Mixed",
      accessKey: accessKeyStr,
      protocol: `135260${Math.floor(100000000 + Math.random() * 900000000)}`
    };

    window.db.addSale(newSale);
    this.cart = [];
    
    // Switch to accounting/sales view and open DANFE
    this.switchView("accounting");
    this.openDanfeModal(newId, "saida");
  }

  // SALES HISTORY
  renderSalesTable() {
    const tbody = document.getElementById("sales-history-tbody");
    if (!tbody) return;

    tbody.innerHTML = "";
    const list = window.db.getSales();
    const query = document.getElementById("sales-search").value.toLowerCase();

    let cumulativeTaxes = 0;
    let cumulativeSaved = 0;
    const taxRules = window.db.get("tax_config");

    list.forEach(s => {
      cumulativeTaxes += s.taxAmount;
      let taxSaved = 0;
      s.items.forEach(item => {
        const prod = window.db.getProducts().find(p => p.id === item.id);
        if (prod && prod.organicCert === "Certificado") {
          taxSaved += item.total * (taxRules.organicDiscount / 100);
        }
      });
      cumulativeSaved += taxSaved;

      if (s.customerName.toLowerCase().includes(query) || s.channel.toLowerCase().includes(query) || s.id.includes(query)) {
        const tr = document.createElement("tr");

        let badgeClass = "badge-success";
        if (s.status === "Preparando") badgeClass = "badge-warning";
        if (s.status === "Cancelado") badgeClass = "badge-danger";

        tr.innerHTML = `
          <td><strong>#${s.id}</strong></td>
          <td>${this.formatDateTime(s.date)}</td>
          <td>${s.customerName}</td>
          <td><strong>${this.formatCurrency(s.total)}</strong></td>
          <td>${this.formatCurrency(s.taxAmount)}</td>
          <td><span class="badge ${s.channel === 'iFood' ? 'badge-danger' : s.channel === 'WhatsApp' ? 'badge-success' : 'badge-info'}">${s.channel}</span></td>
          <td>
            <button class="btn btn-secondary btn-sm" onclick="app.openDanfeModal('${s.id}', 'saida')">
              <i class="fa-solid fa-receipt"></i> Ver DANFE
            </button>
          </td>
          <td><span class="badge ${badgeClass}">${s.status}</span></td>
        `;
        tbody.appendChild(tr);
      }
    });

    document.getElementById("tax-kpi-total").textContent = this.formatCurrency(cumulativeTaxes);
    document.getElementById("tax-kpi-saved").textContent = this.formatCurrency(cumulativeSaved);
    const effectiveRate = cumulativeTaxes > 0 ? ((cumulativeTaxes / (cumulativeTaxes + list.reduce((sum, s) => sum + s.total, 0))) * 100) : 3.96;
    document.getElementById("tax-kpi-effective").textContent = `${effectiveRate.toFixed(2)}%`;
  }

  // FISCAL & ACCOUNTING MANAGEMENT VIEW
  setupFiscalSubtabs() {
    const tabs = document.querySelectorAll(".fiscal-tab-btn");
    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        const targetSubview = tab.getAttribute("data-subview");
        this.switchFiscalSubview(targetSubview);
      });
    });
  }

  switchFiscalSubview(subviewName) {
    this.fiscalSubview = subviewName;

    // Toggle tab active class
    document.querySelectorAll(".fiscal-tab-btn").forEach(tab => {
      if (tab.getAttribute("data-subview") === subviewName) {
        tab.classList.add("active");
      } else {
        tab.classList.remove("active");
      }
    });

    // Toggle subpanel display
    document.querySelectorAll(".fiscal-subpanel").forEach(panel => {
      if (panel.id === `${subviewName}-subpanel`) {
        panel.classList.add("active");
      } else {
        panel.classList.remove("active");
      }
    });

    if (subviewName === "fiscal-summary") {
      this.renderAccountingSummary();
    } else if (subviewName === "fiscal-entries") {
      this.renderEntriesTable();
    } else if (subviewName === "fiscal-exits") {
      this.renderExitsTable();
    }
  }

  renderAccounting() {
    this.renderAccountingSummary();
    this.renderEntriesTable();
    this.renderExitsTable();
  }

  renderAccountingSummary() {
    const sales = window.db.getSales();
    const entries = window.db.getEntries();
    const taxRules = window.db.get("tax_config");

    const totalOut = sales.filter(s => s.status !== "Cancelado").reduce((sum, s) => sum + s.total, 0);
    const totalIn = entries.reduce((sum, e) => sum + e.total, 0);
    const simTaxes = sales.filter(s => s.status !== "Cancelado").reduce((sum, s) => sum + s.taxAmount, 0);

    document.getElementById("fisc-revenue-out").textContent = this.formatCurrency(totalOut);
    document.getElementById("fisc-revenue-in").textContent = this.formatCurrency(totalIn);
    document.getElementById("fisc-taxes-paid").textContent = this.formatCurrency(simTaxes);
  }

  renderEntriesTable() {
    const tbody = document.getElementById("entry-invoices-tbody");
    if (!tbody) return;

    tbody.innerHTML = "";
    const list = window.db.getEntries();
    const query = document.getElementById("entry-invoice-search").value.toLowerCase();

    list.forEach(entry => {
      if (entry.supplierName.toLowerCase().includes(query) || entry.invoiceNumber.includes(query)) {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td><strong>#${entry.id}</strong></td>
          <td>${entry.invoiceNumber}</td>
          <td>${this.formatDateTime(entry.date)}</td>
          <td>${entry.supplierName}</td>
          <td><span class="badge badge-info">${entry.cfop}</span></td>
          <td><strong>${this.formatCurrency(entry.total)}</strong></td>
          <td><span class="badge badge-success">${entry.status}</span></td>
          <td>
            <button class="btn btn-secondary btn-sm" onclick="app.openDanfeModal('${entry.id}', 'entrada')" title="Ver DANFE"><i class="fa-solid fa-file-pdf"></i> DANFE</button>
            <button class="btn btn-secondary btn-sm" onclick="app.openXmlModal('${entry.id}', 'entrada')" title="Ver XML"><i class="fa-solid fa-code"></i> XML</button>
          </td>
        `;
        tbody.appendChild(tr);
      }
    });
  }

  renderExitsTable() {
    const tbody = document.getElementById("exit-invoices-tbody");
    if (!tbody) return;

    tbody.innerHTML = "";
    const list = window.db.getSales();
    const query = document.getElementById("exit-invoice-search").value.toLowerCase();

    list.forEach(sale => {
      if (sale.customerName.toLowerCase().includes(query) || sale.invoiceNumber.includes(query) || sale.id.includes(query)) {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td><strong>#${sale.id}</strong></td>
          <td>${sale.invoiceNumber}</td>
          <td>${this.formatDateTime(sale.date)}</td>
          <td>${sale.customerName}</td>
          <td><span class="badge badge-info">${sale.cfop || '5.102'}</span></td>
          <td><strong>${this.formatCurrency(sale.total)}</strong></td>
          <td><span class="badge badge-success">Autorizada</span></td>
          <td>
            <button class="btn btn-secondary btn-sm" onclick="app.openDanfeModal('${sale.id}', 'saida')" title="Ver DANFE"><i class="fa-solid fa-file-pdf"></i> DANFE</button>
            <button class="btn btn-secondary btn-sm" onclick="app.openXmlModal('${sale.id}', 'saida')" title="Ver XML"><i class="fa-solid fa-code"></i> XML</button>
          </td>
        `;
        tbody.appendChild(tr);
      }
    });
  }

  openRestockModal() {
    const modal = document.getElementById("restock-modal");
    const form = document.getElementById("restock-form");
    
    // Fill Supplier select
    const sSelect = document.getElementById("restock-supplier-select");
    sSelect.innerHTML = "";
    window.db.getSuppliers().forEach(s => {
      const opt = document.createElement("option");
      opt.value = s.id;
      opt.textContent = `${s.name} (${s.contactPerson})`;
      sSelect.appendChild(opt);
    });

    // Fill Product select
    const pSelect = document.getElementById("restock-product-select");
    pSelect.innerHTML = "";
    window.db.getProducts().forEach(p => {
      const opt = document.createElement("option");
      opt.value = p.id;
      opt.textContent = `${p.name} (Atual: ${p.stock} ${p.unit})`;
      pSelect.appendChild(opt);
    });

    form.reset();
    this.handleRestockProductChange();
    modal.showModal();
  }

  closeRestockModal() {
    document.getElementById("restock-modal").close();
  }

  handleRestockProductChange() {
    const pSelect = document.getElementById("restock-product-select");
    const costInput = document.getElementById("restock-cost-input");
    
    const prodId = pSelect.value;
    if (prodId) {
      const product = window.db.getProducts().find(p => p.id === prodId);
      if (product) {
        costInput.value = product.cost.toFixed(2);
      }
    }
  }

  handleRestockFormSubmit(e) {
    e.preventDefault();
    const supplierId = document.getElementById("restock-supplier-select").value;
    const productId = document.getElementById("restock-product-select").value;
    const qty = Number(document.getElementById("restock-qty-input").value);
    const cost = Number(document.getElementById("restock-cost-input").value);
    const cfop = document.getElementById("restock-cfop-select").value;

    const supplier = window.db.getSuppliers().find(s => s.id === supplierId);
    const product = window.db.getProducts().find(p => p.id === productId);

    const entries = window.db.getEntries();
    const lastIdNum = entries.length > 0 ? parseInt(entries[0].id.substring(1)) : 0;
    const newId = `E${String(lastIdNum + 1).padStart(3, '0')}`;
    const invoiceNum = String(856 + lastIdNum).padStart(6, '0');

    const totalCost = cost * qty;
    const accessKeyStr = `352607${supplier.cnpj.replace(/\D/g, '')}55001000000${invoiceNum}${Math.floor(100000 + Math.random() * 900000)}`;

    const newEntry = {
      id: newId,
      date: new Date().toISOString(),
      supplierId: supplierId,
      supplierName: supplier.name,
      items: [{
        id: productId,
        name: product.name,
        cost: cost,
        qty: qty,
        total: totalCost,
        cfop: cfop,
        csosn: "400"
      }],
      total: totalCost,
      cfop: cfop,
      csosn: "400",
      taxAmount: 0.00,
      invoiceNumber: invoiceNum,
      status: "Autorizada",
      accessKey: accessKeyStr,
      protocol: `135260${Math.floor(100000000 + Math.random() * 900000000)}`
    };

    window.db.addEntry(newEntry);
    this.closeRestockModal();
    this.renderAccounting();
    this.renderProductsTable();
    
    alert(`Nota Fiscal de Entrada Nº ${invoiceNum} emitida com sucesso e estoque atualizado!`);
  }

  // EMIT DANFE (Model 55 Layout)
  openDanfeModal(id, type) {
    let documentData = null;
    let transportadorStr = "";
    let destinatarioHtml = "";
    let emitenteHtml = "";
    
    if (type === "saida") {
      documentData = window.db.getSales().find(s => s.id === id);
      emitenteHtml = `
        <div class="danfe-col" style="width: 40%;">
          <span class="danfe-label">Emitente</span>
          <span class="danfe-val" style="font-size: 11px;">RANCHO ORGÂNICO LTDA</span><br>
          AV. REPUBLICA DO BRASIL, 1200 - BELA VISTA<br>
          SAO PAULO - SP - CEP: 01300-000<br>
          FONE: (11) 5555-4321
        </div>
      `;

      let clientAddress = "CONSUMIDOR FINAL SEM IDENTIFICAÇÃO";
      let clientName = "CONSUMIDOR FINAL";
      let clientCpf = "000.000.000-00";
      let clientIe = "ISENTO";

      if (documentData.customerId !== "walk-in") {
        const c = window.db.getCustomers().find(cust => cust.id === documentData.customerId);
        if (c) {
          clientName = c.name;
          clientAddress = c.address;
          clientCpf = "123.456.789-00"; // Mocked
        }
      }

      destinatarioHtml = `
        <div class="danfe-box">
          <div class="danfe-row">
            <div class="danfe-col" style="width: 60%;">
              <span class="danfe-label">Nome / Razão Social</span>
              <span class="danfe-val">${clientName}</span>
            </div>
            <div class="danfe-col" style="width: 25%;">
              <span class="danfe-label">CNPJ/CPF</span>
              <span class="danfe-val">${clientCpf}</span>
            </div>
            <div class="danfe-col" style="width: 15%;">
              <span class="danfe-label">Data Emissão</span>
              <span class="danfe-val">${this.formatDateTime(documentData.date).split(' ')[0]}</span>
            </div>
          </div>
          <div class="danfe-row" style="border-bottom: none;">
            <div class="danfe-col" style="width: 60%;">
              <span class="danfe-label">Endereço</span>
              <span class="danfe-val">${clientAddress}</span>
            </div>
            <div class="danfe-col" style="width: 25%;">
              <span class="danfe-label">Inscrição Estadual</span>
              <span class="danfe-val">${clientIe}</span>
            </div>
            <div class="danfe-col" style="width: 15%;">
              <span class="danfe-label">Hora Emissão</span>
              <span class="danfe-val">${this.formatDateTime(documentData.date).split(' ')[1]}</span>
            </div>
          </div>
        </div>
      `;
      transportadorStr = "TRANSPORTE PROPRIO (REMETENTE) - FRETE POR CONTA DO DESTINATÁRIO";

    } else {
      // Entrada
      documentData = window.db.getEntries().find(e => e.id === id);
      const supplier = window.db.getSuppliers().find(s => s.id === documentData.supplierId);
      
      emitenteHtml = `
        <div class="danfe-col" style="width: 40%;">
          <span class="danfe-label">Emitente (Destinatário da Entrada)</span>
          <span class="danfe-val" style="font-size: 11px;">RANCHO ORGÂNICO LTDA</span><br>
          AV. REPUBLICA DO BRASIL, 1200 - BELA VISTA<br>
          SAO PAULO - SP - CEP: 01300-000<br>
          CNPJ: 12.345.678/0001-90  IE: 123.456.789.111
        </div>
      `;

      destinatarioHtml = `
        <div class="danfe-box">
          <div class="danfe-row">
            <div class="danfe-col" style="width: 60%;">
              <span class="danfe-label">Remetente (Produtor Rural)</span>
              <span class="danfe-val">${supplier ? supplier.name : documentData.supplierName}</span>
            </div>
            <div class="danfe-col" style="width: 25%;">
              <span class="danfe-label">CNPJ / CPF</span>
              <span class="danfe-val">${supplier ? supplier.cnpj : '00.000.000/0001-00'}</span>
            </div>
            <div class="danfe-col" style="width: 15%;">
              <span class="danfe-label">Data Operação</span>
              <span class="danfe-val">${this.formatDateTime(documentData.date).split(' ')[0]}</span>
            </div>
          </div>
          <div class="danfe-row" style="border-bottom: none;">
            <div class="danfe-col" style="width: 60%;">
              <span class="danfe-label">Endereço Rural</span>
              <span class="danfe-val">${supplier ? supplier.address : 'Estrada Rural, Km 10'}</span>
            </div>
            <div class="danfe-col" style="width: 25%;">
              <span class="danfe-label">Inscrição Estadual</span>
              <span class="danfe-val">${supplier ? supplier.stateInscr : 'ISENTO'}</span>
            </div>
            <div class="danfe-col" style="width: 15%;">
              <span class="danfe-label">Hora Operação</span>
              <span class="danfe-val">${this.formatDateTime(documentData.date).split(' ')[1]}</span>
            </div>
          </div>
        </div>
      `;
      transportadorStr = "RETIRADA NO LOCAL - FRETE POR CONTA DO ADQUIRENTE";
    }

    if (!documentData) return;

    const container = document.getElementById("danfe-paper-container");
    
    // Render item rows
    let itemRowsHtml = "";
    documentData.items.forEach((item, index) => {
      const priceVal = type === "saida" ? item.price : item.cost;
      itemRowsHtml += `
        <tr>
          <td>${item.id}</td>
          <td>${item.name}</td>
          <td>0709.90.00</td>
          <td>400</td>
          <td>${item.cfop || documentData.cfop}</td>
          <td>UN</td>
          <td>${item.qty.toFixed(1)}</td>
          <td>R$ ${priceVal.toFixed(2)}</td>
          <td>R$ ${item.total.toFixed(2)}</td>
          <td>R$ 0,00</td>
          <td>0,00%</td>
        </tr>
      `;
    });

    const formattedKey = documentData.accessKey.replace(/(.{4})/g, '$1 ');

    container.innerHTML = `
      <!-- A4 DANFE Structure -->
      <div class="danfe-box">
        <div class="danfe-row" style="border-bottom: none;">
          ${emitenteHtml}
          
          <div class="danfe-col" style="width: 20%; border-left: 1.5px solid #000; text-align: center;">
            <span class="danfe-val" style="font-size: 13px; font-weight: 800;">DANFE</span><br>
            <span>Documento Auxiliar da<br>Nota Fiscal Eletrônica</span><br>
            <span style="font-size: 9px; font-weight: bold;">0 - ENTRADA<br>1 - SAÍDA</span><br>
            <span class="danfe-val" style="font-size: 12px; border: 1px solid #000; padding: 2px 6px;">${type === 'entrada' ? '0' : '1'}</span><br>
            <span>Nº ${documentData.invoiceNumber}<br>SÉRIE 001</span>
          </div>
          
          <div class="danfe-col" style="width: 40%; border-left: 1.5px solid #000;">
            <span class="danfe-label">Controle do Fisco</span>
            <div style="font-family: monospace; font-size: 8px; text-align: center; margin: 4px 0;">
              ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
            </div>
            <span class="danfe-label">Chave de Acesso</span>
            <span class="danfe-val" style="font-size: 10px; font-family: monospace;">${formattedKey}</span><br>
            <span style="font-size: 8px; text-align: center; color: #444;">Consulta de autenticidade no portal nacional da NF-e www.nfe.fazenda.gov.br ou no site da Sefaz-SP</span>
          </div>
        </div>
      </div>

      <div class="danfe-box">
        <div class="danfe-row" style="border-bottom: none;">
          <div class="danfe-col" style="width: 50%;">
            <span class="danfe-label">Natureza da Operação</span>
            <span class="danfe-val">${type === 'entrada' ? 'COMPRA PARA COMERCIALIZACAO (RURAL)' : 'VENDA MERC. ADQ. TERCEIROS'}</span>
          </div>
          <div class="danfe-col" style="width: 25%;">
            <span class="danfe-label">Protocolo de Autorização de Uso</span>
            <span class="danfe-val">${documentData.protocol} - Autorizada</span>
          </div>
          <div class="danfe-col" style="width: 25%;">
            <span class="danfe-label">CNPJ</span>
            <span class="danfe-val">12.345.678/0001-90</span>
          </div>
        </div>
      </div>

      <!-- Destinatário -->
      <h3 style="font-size: 9px; font-weight: bold; margin-bottom: 2px;">DESTINATÁRIO / REMETENTE</h3>
      ${destinatarioHtml}

      <!-- Impostos -->
      <h3 style="font-size: 9px; font-weight: bold; margin-bottom: 2px;">CÁLCULO DO IMPOSTO</h3>
      <div class="danfe-box">
        <div class="danfe-row">
          <div class="danfe-col" style="width: 20%;">
            <span class="danfe-label">Base de Cálculo ICMS</span>
            <span class="danfe-val">R$ 0,00</span>
          </div>
          <div class="danfe-col" style="width: 20%;">
            <span class="danfe-label">Valor do ICMS</span>
            <span class="danfe-val">R$ 0,00</span>
          </div>
          <div class="danfe-col" style="width: 20%;">
            <span class="danfe-label">Base Calc ICMS S.T.</span>
            <span class="danfe-val">R$ 0,00</span>
          </div>
          <div class="danfe-col" style="width: 20%;">
            <span class="danfe-label">Valor ICMS S.T.</span>
            <span class="danfe-val">R$ 0,00</span>
          </div>
          <div class="danfe-col" style="width: 20%;">
            <span class="danfe-label">Valor Total dos Produtos</span>
            <span class="danfe-val">${this.formatCurrency(documentData.total)}</span>
          </div>
        </div>
        <div class="danfe-row" style="border-bottom: none;">
          <div class="danfe-col" style="width: 20%;">
            <span class="danfe-label">Valor do Frete</span>
            <span class="danfe-val">R$ 0,00</span>
          </div>
          <div class="danfe-col" style="width: 20%;">
            <span class="danfe-label">Valor do Seguro</span>
            <span class="danfe-val">R$ 0,00</span>
          </div>
          <div class="danfe-col" style="width: 20%;">
            <span class="danfe-label">Desconto</span>
            <span class="danfe-val">R$ 0,00</span>
          </div>
          <div class="danfe-col" style="width: 20%;">
            <span class="danfe-label">Outras Despesas</span>
            <span class="danfe-val">R$ 0,00</span>
          </div>
          <div class="danfe-col" style="width: 20%;">
            <span class="danfe-label">Valor Total da Nota</span>
            <span class="danfe-val">${this.formatCurrency(documentData.total)}</span>
          </div>
        </div>
      </div>

      <!-- Transportador -->
      <h3 style="font-size: 9px; font-weight: bold; margin-bottom: 2px;">TRANSPORTADOR / VOLUMES TRANSPORTADOS</h3>
      <div class="danfe-box">
        <div class="danfe-row" style="border-bottom: none;">
          <div class="danfe-col" style="width: 50%;">
            <span class="danfe-label">Razão Social / Modalidade</span>
            <span class="danfe-val">${transportadorStr}</span>
          </div>
          <div class="danfe-col" style="width: 25%;">
            <span class="danfe-label">Placa do Veículo</span>
            <span class="danfe-val">EM BRANCO</span>
          </div>
          <div class="danfe-col" style="width: 25%;">
            <span class="danfe-label">CNPJ / CPF</span>
            <span class="danfe-val">EM BRANCO</span>
          </div>
        </div>
      </div>

      <!-- Itens Tabela -->
      <h3 style="font-size: 9px; font-weight: bold; margin-bottom: 2px;">DADOS DOS PRODUTOS / SERVIÇOS</h3>
      <div class="danfe-table-wrap">
        <table class="danfe-table">
          <thead>
            <tr>
              <th style="width: 8%;">CÓD. PROD</th>
              <th style="width: 30%;">DESCRIÇÃO DO PRODUTO</th>
              <th style="width: 10%;">NCM/SH</th>
              <th style="width: 8%;">CSOSN</th>
              <th style="width: 8%;">CFOP</th>
              <th style="width: 5%;">UN</th>
              <th style="width: 8%;">QTD</th>
              <th style="width: 10%;">V. UNIT</th>
              <th style="width: 10%;">V. TOTAL</th>
              <th style="width: 8%;">V. ICMS</th>
              <th style="width: 5%;">ALÍQ</th>
            </tr>
          </thead>
          <tbody>
            ${itemRowsHtml}
          </tbody>
        </table>
      </div>

      <!-- Dados Adicionais -->
      <h3 style="font-size: 9px; font-weight: bold; margin-bottom: 2px;">DADOS ADICIONAIS</h3>
      <div class="danfe-additional-info">
        <span class="danfe-label" style="display: block; margin-bottom: 4px;">Informações Complementares</span>
        <span style="font-size: 9px; font-family: monospace;">
          Regime Tributario: Simples Nacional. Aliquota Efetiva: ${type === 'entrada' ? '0.00' : '3.96'}% devido a isenção tributaria estadual SP de produtos hortifruticolas frescos orgânicos.<br>
          LEI DA TRANSPARENCIA (LEI 12.741/12): ESTIMATIVA DE TRIBUTOS ESTIMADOS TOTAL R$ ${documentData.taxAmount.toFixed(2)} (${((documentData.taxAmount / documentData.total) * 100).toFixed(2)}%).<br>
          PRODUTOS ISENTOS DE ICMS CONFORME ARTIGO 36 DO ANEXO I DO REGULAMENTO DO ICMS DO ESTADO DE SAO PAULO (DECRETO ESTADUAL 45.490/2000).
        </span>
      </div>
    `;

    document.getElementById("danfe-modal").showModal();
  }

  closeDanfeModal() {
    document.getElementById("danfe-modal").close();
  }

  // EMIT SIMULATED XML (SEFAZ compliant structured layout)
  openXmlModal(id, type) {
    let doc = null;
    let natOp = "";
    let partnerXml = "";

    if (type === "saida") {
      doc = window.db.getSales().find(s => s.id === id);
      natOp = "VENDA MERC. ADQ. TERCEIROS";
      
      let clientCpf = "00000000000";
      let clientName = "CONSUMIDOR FINAL";
      if (doc.customerId !== "walk-in") {
        const c = window.db.getCustomers().find(cust => cust.id === doc.customerId);
        if (c) {
          clientName = c.name;
          clientCpf = c.phone.replace(/\D/g, '') || "12345678900";
        }
      }

      partnerXml = `
    <span class="xml-tag">&lt;dest&gt;</span>
        <span class="xml-tag">&lt;CPF&gt;</span><span class="xml-text">${clientCpf}</span><span class="xml-tag">&lt;/CPF&gt;</span>
        <span class="xml-tag">&lt;xNome&gt;</span><span class="xml-text">${clientName}</span><span class="xml-tag">&lt;/xNome&gt;</span>
        <span class="xml-tag">&lt;indIEDest&gt;</span><span class="xml-text">9</span><span class="xml-tag">&lt;/indIEDest&gt;</span>
    <span class="xml-tag">&lt;/dest&gt;</span>`;

    } else {
      doc = window.db.getEntries().find(e => e.id === id);
      natOp = doc.cfop === "1.122" ? "COMPRA DE PRODUTOR RURAL" : "COMPRA PARA COMERCIALIZACAO";
      
      const supplier = window.db.getSuppliers().find(s => s.id === doc.supplierId);
      const supplierCnpj = supplier ? supplier.cnpj.replace(/\D/g, '') : "11222333000144";
      const supplierName = supplier ? supplier.name : doc.supplierName;
      const supplierIe = supplier ? supplier.stateInscr.replace(/\D/g, '') : "ISENTO";

      partnerXml = `
    <span class="xml-tag">&lt;dest&gt;</span> <!-- Para nota de Entrada, o Rancho e o dest/emitante, e o produtor o remetente -->
        <span class="xml-tag">&lt;CNPJ&gt;</span><span class="xml-text">${supplierCnpj}</span><span class="xml-tag">&lt;/CNPJ&gt;</span>
        <span class="xml-tag">&lt;xNome&gt;</span><span class="xml-text">${supplierName}</span><span class="xml-tag">&lt;/xNome&gt;</span>
        <span class="xml-tag">&lt;IE&gt;</span><span class="xml-text">${supplierIe}</span><span class="xml-tag">&lt;/IE&gt;</span>
    <span class="xml-tag">&lt;/dest&gt;</span>`;
    }

    if (!doc) return;

    // Build items XML
    let itemsXml = "";
    doc.items.forEach((item, index) => {
      const priceVal = type === "saida" ? item.price : item.cost;
      itemsXml += `
    <span class="xml-tag">&lt;det</span> <span class="xml-attr">nItem=</span><span class="xml-val">"${index + 1}"</span><span class="xml-tag">&gt;</span>
        <span class="xml-tag">&lt;prod&gt;</span>
            <span class="xml-tag">&lt;cProd&gt;</span><span class="xml-text">${item.id}</span><span class="xml-tag">&lt;/cProd&gt;</span>
            <span class="xml-tag">&lt;cEAN&gt;</span><span class="xml-text">SEM GTIN</span><span class="xml-tag">&lt;/cEAN&gt;</span>
            <span class="xml-tag">&lt;xProd&gt;</span><span class="xml-text">${item.name}</span><span class="xml-tag">&lt;/xProd&gt;</span>
            <span class="xml-tag">&lt;NCM&gt;</span><span class="xml-text">07099990</span><span class="xml-tag">&lt;/NCM&gt;</span>
            <span class="xml-tag">&lt;CFOP&gt;</span><span class="xml-text">${item.cfop || doc.cfop}</span><span class="xml-tag">&lt;/CFOP&gt;</span>
            <span class="xml-tag">&lt;uCom&gt;</span><span class="xml-text">UN</span><span class="xml-tag">&lt;/uCom&gt;</span>
            <span class="xml-tag">&lt;qCom&gt;</span><span class="xml-text">${item.qty.toFixed(4)}</span><span class="xml-tag">&lt;/qCom&gt;</span>
            <span class="xml-tag">&lt;vUnCom&gt;</span><span class="xml-text">${priceVal.toFixed(4)}</span><span class="xml-tag">&lt;/vUnCom&gt;</span>
            <span class="xml-tag">&lt;vProd&gt;</span><span class="xml-text">${item.total.toFixed(2)}</span><span class="xml-tag">&lt;/vProd&gt;</span>
        <span class="xml-tag">&lt;/prod&gt;</span>
        <span class="xml-tag">&lt;imposto&gt;</span>
            <span class="xml-tag">&lt;ICMS&gt;</span>
                <span class="xml-tag">&lt;ICMSSN400&gt;</span> <!-- CSOSN 400 SP Organic ICMS Exemption RICMS/SP Art 36 -->
                    <span class="xml-tag">&lt;orig&gt;</span><span class="xml-text">0</span><span class="xml-tag">&lt;/orig&gt;</span>
                    <span class="xml-tag">&lt;CSOSN&gt;</span><span class="xml-text">400</span><span class="xml-tag">&lt;/CSOSN&gt;</span>
                <span class="xml-tag">&lt;/ICMSSN400&gt;</span>
            <span class="xml-tag">&lt;/ICMS&gt;</span>
        <span class="xml-tag">&lt;/imposto&gt;</span>
    <span class="xml-tag">&lt;/det&gt;</span>`;
    });

    const codeContainer = document.getElementById("xml-code-container");
    codeContainer.innerHTML = `
<span class="xml-tag">&lt;?xml</span> <span class="xml-attr">version=</span><span class="xml-val">"1.0"</span> <span class="xml-attr">encoding=</span><span class="xml-val">"UTF-8"</span><span class="xml-tag">?&gt;</span>
<span class="xml-tag">&lt;NFe</span> <span class="xml-attr">xmlns=</span><span class="xml-val">"http://www.portalfiscal.inf.br/nfe"</span><span class="xml-tag">&gt;</span>
  <span class="xml-tag">&lt;infNFe</span> <span class="xml-attr">Id=</span><span class="xml-val">"NFe${doc.accessKey}"</span> <span class="xml-attr">versao=</span><span class="xml-val">"4.00"</span><span class="xml-tag">&gt;</span>
    <span class="xml-tag">&lt;ide&gt;</span>
      <span class="xml-tag">&lt;cUF&gt;</span><span class="xml-text">35</span><span class="xml-tag">&lt;/cUF&gt;</span> <!-- SP -->
      <span class="xml-tag">&lt;cNF&gt;</span><span class="xml-text">${doc.invoiceNumber}</span><span class="xml-tag">&lt;/cNF&gt;</span>
      <span class="xml-tag">&lt;natOp&gt;</span><span class="xml-text">${natOp}</span><span class="xml-tag">&lt;/natOp&gt;</span>
      <span class="xml-tag">&lt;mod&gt;</span><span class="xml-text">55</span><span class="xml-tag">&lt;/mod&gt;</span>
      <span class="xml-tag">&lt;serie&gt;</span><span class="xml-text">1</span><span class="xml-tag">&lt;/serie&gt;</span>
      <span class="xml-tag">&lt;nNF&gt;</span><span class="xml-text">${doc.invoiceNumber}</span><span class="xml-tag">&lt;/nNF&gt;</span>
      <span class="xml-tag">&lt;dhEmi&gt;</span><span class="xml-text">${doc.date}</span><span class="xml-tag">&lt;/dhEmi&gt;</span>
      <span class="xml-tag">&lt;tpNF&gt;</span><span class="xml-text">${type === 'entrada' ? '0' : '1'}</span><span class="xml-tag">&lt;/tpNF&gt;</span>
    <span class="xml-tag">&lt;/ide&gt;</span>
    <span class="xml-tag">&lt;emit&gt;</span>
      <span class="xml-tag">&lt;CNPJ&gt;</span><span class="xml-text">12345678000190</span><span class="xml-tag">&lt;/CNPJ&gt;</span>
      <span class="xml-tag">&lt;xNome&gt;</span><span class="xml-text">Rancho Organico Ltda</span><span class="xml-tag">&lt;/xNome&gt;</span>
      <span class="xml-tag">&lt;IE&gt;</span><span class="xml-text">123456789111</span><span class="xml-tag">&lt;/IE&gt;</span>
      <span class="xml-tag">&lt;enderEmit&gt;</span>
        <span class="xml-tag">&lt;xLgr&gt;</span><span class="xml-text">Av Republica do Brasil</span><span class="xml-tag">&lt;/xLgr&gt;</span>
        <span class="xml-tag">&lt;nro&gt;</span><span class="xml-text">1200</span><span class="xml-tag">&lt;/nro&gt;</span>
        <span class="xml-tag">&lt;xBairro&gt;</span><span class="xml-text">Bela Vista</span><span class="xml-tag">&lt;/xBairro&gt;</span>
        <span class="xml-tag">&lt;cMun&gt;</span><span class="xml-text">3550308</span><span class="xml-tag">&lt;/cMun&gt;</span> <!-- Sao Paulo -->
        <span class="xml-tag">&lt;xMun&gt;</span><span class="xml-text">SAO PAULO</span><span class="xml-tag">&lt;/xMun&gt;</span>
        <span class="xml-tag">&lt;UF&gt;</span><span class="xml-text">SP</span><span class="xml-tag">&lt;/UF&gt;</span>
      <span class="xml-tag">&lt;/enderEmit&gt;</span>
    <span class="xml-tag">&lt;/emit&gt;</span>
    ${partnerXml}
    ${itemsXml}
    <span class="xml-tag">&lt;total&gt;</span>
      <span class="xml-tag">&lt;ICMSTot&gt;</span>
        <span class="xml-tag">&lt;vBC&gt;</span><span class="xml-text">0.00</span><span class="xml-tag">&lt;/vBC&gt;</span>
        <span class="xml-tag">&lt;vICMS&gt;</span><span class="xml-text">0.00</span><span class="xml-tag">&lt;/vICMS&gt;</span>
        <span class="xml-tag">&lt;vProd&gt;</span><span class="xml-text">${doc.total.toFixed(2)}</span><span class="xml-tag">&lt;/vProd&gt;</span>
        <span class="xml-tag">&lt;vNF&gt;</span><span class="xml-text">${doc.total.toFixed(2)}</span><span class="xml-tag">&lt;/vNF&gt;</span>
      <span class="xml-tag">&lt;/ICMSTot&gt;</span>
    <span class="xml-tag">&lt;/total&gt;</span>
    <span class="xml-tag">&lt;infAdic&gt;</span>
      <span class="xml-tag">&lt;infCpl&gt;</span><span class="xml-text">ICMS isento conforme RICMS/SP Anexo I Artigo 36. Rancho Organico Ltda.</span><span class="xml-tag">&lt;/infCpl&gt;</span>
    <span class="xml-tag">&lt;/infAdic&gt;</span>
  <span class="xml-tag">&lt;/infNFe&gt;</span>
<span class="xml-tag">&lt;/NFe&gt;</span>`;

    document.getElementById("xml-modal").showModal();
  }

  closeXmlModal() {
    document.getElementById("xml-modal").close();
  }

  // INTEGRATIONS & WEBHOOK SIMULATOR
  toggleIntegration(platform) {
    const toggle = document.getElementById(`${platform}-toggle`);
    const statusDot = document.getElementById(`${platform}-status-dot`);
    
    if (toggle && statusDot) {
      if (toggle.checked) {
        statusDot.classList.add("active");
        if (platform === "ifood") document.getElementById("ifood-sync-status").textContent = "Sincronizado: Agora mesmo";
        if (platform === "cardapiofacil") document.getElementById("cardapiofacil-sync-status").textContent = "Sincronizado: Agora mesmo";
      } else {
        statusDot.classList.remove("active");
        if (platform === "ifood") document.getElementById("ifood-sync-status").textContent = "Desconectado";
        if (platform === "cardapiofacil") document.getElementById("cardapiofacil-sync-status").textContent = "Desconectado";
      }
    }
  }

  simulateIncomingOrder(platform) {
    const isEnabled = document.getElementById(`${platform.toLowerCase()}-toggle`).checked;
    if (!isEnabled) {
      alert(`A integração com ${platform} está desativada. Ative o interruptor primeiro!`);
      return;
    }

    const audio = document.getElementById("alert-sound");
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(e => {});
    }

    const firstNames = ["Gabriel", "Lucas", "Julia", "Fernanda", "Pedro", "Carla", "Ricardo", "Vanessa"];
    const lastNames = ["Oliveira", "Melo", "Almeida", "Mendes", "Moreira", "Cardoso", "Barbosa"];
    const randomName = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;

    const products = window.db.getProducts().filter(p => p.stock > 2);
    if (products.length === 0) return;

    const orderItems = [];
    const itemsCount = Math.floor(Math.random() * 3) + 1;
    let orderTotal = 0;

    for (let i = 0; i < itemsCount; i++) {
      const randomProd = products[Math.floor(Math.random() * products.length)];
      if (orderItems.some(item => item.id === randomProd.id)) continue;
      
      const qty = Math.floor(Math.random() * 2) + 1;
      const totalItem = randomProd.price * qty;
      orderTotal += totalItem;

      orderItems.push({
        id: randomProd.id,
        name: randomProd.name,
        price: randomProd.price,
        qty: qty,
        total: totalItem,
        cfop: "5.106",
        csosn: randomProd.organicCert === "Certificado" ? "400" : "102"
      });
    }

    const sales = window.db.getSales();
    const lastIdNum = sales.length > 0 ? parseInt(sales[0].id.substring(1)) : 0;
    const newId = `V${String(lastIdNum + 1).padStart(3, '0')}`;
    const invoiceNum = String(10020 + lastIdNum + 1);

    const taxAmt = orderTotal * 0.0396; // Simples SP organic rate
    const accessKeyStr = `35260712345678000190650010000${invoiceNum}${Math.floor(100000 + Math.random() * 900000)}`;

    const newSale = {
      id: newId,
      date: new Date().toISOString(),
      customerId: "walk-in",
      customerName: `[${platform}] ${randomName}`,
      items: orderItems,
      total: Number(orderTotal.toFixed(2)),
      taxAmount: Number(taxAmt.toFixed(2)),
      channel: platform,
      status: "Preparando",
      invoiceNumber: invoiceNum,
      cfop: "5.106",
      csosn: "Mixed",
      accessKey: accessKeyStr,
      protocol: `135260${Math.floor(100000000 + Math.random() * 900000000)}`
    };

    window.db.addSale(newSale);
    alert(`Novo Pedido de [${platform}] - ${randomName} - R$ ${orderTotal.toFixed(2)}`);
    this.switchView("dashboard");
  }

  // WHATSAPP IA WORKSPACE
  initChatWorkspace() {
    this.renderChatsList();
    this.renderActiveChat();
  }

  renderChatsList() {
    const container = document.getElementById("chats-list-container");
    if (!container) return;

    container.innerHTML = "";
    const list = window.db.getChats();
    const query = document.getElementById("chat-search").value.toLowerCase();

    list.forEach(chat => {
      if (chat.customerName.toLowerCase().includes(query)) {
        const item = document.createElement("div");
        item.className = `chat-thumb-item ${this.activeChatId === chat.id ? 'active' : ''}`;
        item.onclick = () => {
          this.activeChatId = chat.id;
          window.db.clearUnread(chat.id);
          this.renderChatsList();
          this.renderActiveChat();
        };

        const lastMsg = chat.messages.length > 0 ? chat.messages[chat.messages.length - 1].text : "";
        const unreadBadge = chat.unread > 0 ? `<span class="chat-thumb-badge">${chat.unread}</span>` : "";

        item.innerHTML = `
          <img class="chat-thumb-avatar" src="${chat.avatar}" alt="Avatar">
          <div class="chat-thumb-details">
            <div class="chat-thumb-header">
              <span class="chat-thumb-name">${chat.customerName}</span>
              <span class="chat-thumb-time">${chat.lastMsgTime}</span>
            </div>
            <div class="chat-thumb-body">
              <span class="chat-thumb-last-msg">${lastMsg}</span>
              ${unreadBadge}
            </div>
          </div>
        `;
        container.appendChild(item);
      }
    });
  }

  renderActiveChat() {
    const chat = window.db.getChats().find(c => c.id === this.activeChatId);
    
    const nameLabel = document.getElementById("active-chat-name");
    const statusLabel = document.getElementById("active-chat-status");
    const avatarWrapper = document.getElementById("active-chat-avatar-wrapper");
    const msgArea = document.getElementById("chat-messages-area");
    const btnToggleAI = document.getElementById("btn-toggle-ai-active");

    if (!chat) {
      nameLabel.textContent = "Selecione uma conversa";
      statusLabel.innerHTML = "";
      msgArea.innerHTML = '<div style="color: var(--text-muted); text-align: center; margin-top: 100px;">Nenhum chat selecionado</div>';
      return;
    }

    nameLabel.textContent = chat.customerName;
    avatarWrapper.innerHTML = `<img src="${chat.avatar}" alt="${chat.customerName}" style="width: 100%; height: 100%; border-radius: 50%;">`;

    if (chat.aiActive) {
      statusLabel.className = "chat-user-status";
      statusLabel.innerHTML = '<span class="chat-user-status-dot"></span> Atendimento por IA';
      btnToggleAI.className = "btn btn-secondary btn-sm";
      btnToggleAI.innerHTML = '<i class="fa-solid fa-user-tie"></i> Assumir Manual';
    } else {
      statusLabel.className = "chat-user-status human";
      statusLabel.innerHTML = '<span class="chat-user-status-dot"></span> Atendimento Humano';
      btnToggleAI.className = "btn btn-primary btn-sm";
      btnToggleAI.innerHTML = '<i class="fa-solid fa-robot"></i> Ativar Assistente IA';
    }

    msgArea.innerHTML = "";
    chat.messages.forEach(msg => {
      const bubble = document.createElement("div");
      bubble.className = `msg-bubble ${msg.sender}`;
      bubble.innerHTML = `
        <div>${msg.text}</div>
        <div class="msg-time">${msg.time}</div>
      `;
      msgArea.appendChild(bubble);
    });

    msgArea.scrollTop = msgArea.scrollHeight;
  }

  toggleChatAI() {
    const list = window.db.getChats();
    const chatIndex = list.findIndex(c => c.id === this.activeChatId);
    if (chatIndex !== -1) {
      list[chatIndex].aiActive = !list[chatIndex].aiActive;
      window.db.saveChats(list);
      this.renderActiveChat();
      this.renderChatsList();
    }
  }

  sendChatMessage() {
    const input = document.getElementById("chat-input-field");
    const text = input.value.trim();
    if (!text) return;

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    window.db.addMessage(this.activeChatId, {
      sender: "merchant",
      text: text,
      time: timeStr
    });

    input.value = "";
    this.renderActiveChat();
    this.renderChatsList();

    const chat = window.db.getChats().find(c => c.id === this.activeChatId);
    if (chat && chat.aiActive) {
      setTimeout(() => this.triggerMockAIResponse(text), 1500);
    }
  }

  handleChatKeyDown(e) {
    if (e.key === "Enter") {
      this.sendChatMessage();
    }
  }

  filterChats() {
    this.renderChatsList();
  }

  triggerMockAIResponse(customerText) {
    const chat = window.db.getChats().find(c => c.id === this.activeChatId);
    if (!chat) return;

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    let replyText = "";
    const lowerText = customerText.toLowerCase();

    if (lowerText.includes("morango") || lowerText.includes("morangos")) {
      const p = window.db.getProducts().find(prod => prod.id === "P006");
      if (p && p.stock > 0) {
        replyText = `Temos sim! Nossos Morangos Orgânicos do Rancho Orgânico estão espetaculares hoje, saindo por R$ ${p.price.toFixed(2)} a ${p.unit}. Atualmente restam ${p.stock} bandejas. Quer que eu separe?`;
      } else {
        replyText = "Infelizmente, nossos morangos orgânicos esgotaram cedo hoje! Mas colhemos bananas pratas deliciosas por R$ 6,20 o Kg. Quer experimentar?";
      }
    } else if (lowerText.includes("alface") || lowerText.includes("verdura")) {
      const p = window.db.getProducts().find(prod => prod.id === "P001");
      replyText = `Temos sim! Alface Crespa Orgânica bem verdinha e crocante por R$ ${p.price.toFixed(2)} o ${p.unit}. Quantos maços gostaria de encomendar?`;
    } else if (lowerText.includes("entrega") || lowerText.includes("frete") || lowerText.includes("taxa")) {
      replyText = "O Rancho Orgânico faz entregas em toda a capital de SP! Frete grátis para compras acima de R$ 50,00. Para pedidos de menor valor, cobramos uma taxa fixa de R$ 7,00.";
    } else if (lowerText.includes("pagamento") || lowerText.includes("cartão") || lowerText.includes("pix")) {
      replyText = "Aceitamos pagamento via Pix, cartões de crédito e débito na entrega, ou vale alimentação (Sodexo e VR). Qual é o melhor para você?";
    } else {
      replyText = "Olá! Como posso ajudar você no seu pedido do Rancho Orgânico hoje? Temos hortaliças frescas, frutas e ovos caipiras de sitiantes locais de SP.";
    }

    window.db.addMessage(this.activeChatId, {
      sender: "ai",
      text: replyText,
      time: timeStr
    });

    this.renderActiveChat();
    this.renderChatsList();
    
    const audio = document.getElementById("alert-sound");
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(e => {});
    }
  }

  loadAIConfigUI() {
    const config = window.db.get("ai_config");
    if (config) {
      document.getElementById("ai-model-select").value = config.model;
      document.getElementById("ai-prompt-editor").value = config.prompt;
      document.getElementById("ai-autoreply-toggle").checked = config.autoReply;
    }
  }

  saveAIConfig() {
    const model = document.getElementById("ai-model-select").value;
    const prompt = document.getElementById("ai-prompt-editor").value;
    const autoReply = document.getElementById("ai-autoreply-toggle").checked;

    window.db.save("ai_config", { model, prompt, autoReply });
  }

  // HELPERS
  formatCurrency(val) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  }

  formatDateTime(isoStr) {
    const d = new Date(isoStr);
    return d.toLocaleString("pt-BR", {
      day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit"
    });
  }

  applyStoreThemeOnStartup() {
    const config = window.db.get("store_config");
    if (config && config.storeTheme) {
      this.applyStoreTheme(config.storeTheme);
    }
  }

  applyStoreTheme(themeName) {
    const root = document.documentElement;
    if (themeName === "forest-emerald") {
      root.style.setProperty('--bg-primary', 'hsl(140, 20%, 96%)');
      root.style.setProperty('--bg-secondary', 'hsl(0, 0%, 100%)');
      root.style.setProperty('--bg-card', 'hsl(0, 0%, 100%)');
      root.style.setProperty('--bg-input', 'hsl(140, 10%, 93%)');
      root.style.setProperty('--border-color', 'hsl(140, 10%, 88%)');
      root.style.setProperty('--accent-primary', 'hsl(160, 84%, 25%)');
      root.style.setProperty('--accent-hover', 'hsl(160, 90%, 18%)');
      root.style.setProperty('--accent-light', 'hsla(160, 80%, 25%, 0.12)');
      root.style.setProperty('--accent-text', 'hsl(160, 85%, 20%)');
      root.style.setProperty('--text-primary', 'hsl(220, 24%, 12%)');
      root.style.setProperty('--text-secondary', 'hsl(220, 12%, 38%)');
      root.style.setProperty('--text-muted', 'hsl(220, 8%, 55%)');
    } else if (themeName === "peach-cream") {
      root.style.setProperty('--bg-primary', 'hsl(30, 30%, 97%)');
      root.style.setProperty('--bg-secondary', 'hsl(0, 0%, 100%)');
      root.style.setProperty('--bg-card', 'hsl(0, 0%, 100%)');
      root.style.setProperty('--bg-input', 'hsl(30, 15%, 93%)');
      root.style.setProperty('--border-color', 'hsl(30, 15%, 88%)');
      root.style.setProperty('--accent-primary', 'hsl(24, 85%, 45%)');
      root.style.setProperty('--accent-hover', 'hsl(24, 90%, 38%)');
      root.style.setProperty('--accent-light', 'hsla(24, 80%, 45%, 0.12)');
      root.style.setProperty('--accent-text', 'hsl(24, 85%, 35%)');
      root.style.setProperty('--text-primary', 'hsl(220, 24%, 12%)');
      root.style.setProperty('--text-secondary', 'hsl(220, 12%, 38%)');
      root.style.setProperty('--text-muted', 'hsl(220, 8%, 55%)');
    } else if (themeName === "dark-charcoal") {
      root.style.setProperty('--bg-primary', 'hsl(220, 15%, 12%)');
      root.style.setProperty('--bg-secondary', 'hsl(220, 12%, 18%)');
      root.style.setProperty('--bg-card', 'hsl(220, 12%, 18%)');
      root.style.setProperty('--bg-input', 'hsl(220, 10%, 24%)');
      root.style.setProperty('--border-color', 'hsl(220, 10%, 26%)');
      root.style.setProperty('--accent-primary', 'hsl(78, 82%, 45%)');
      root.style.setProperty('--accent-hover', 'hsl(78, 90%, 38%)');
      root.style.setProperty('--accent-light', 'hsla(78, 80%, 45%, 0.15)');
      root.style.setProperty('--accent-text', 'hsl(78, 85%, 50%)');
      root.style.setProperty('--text-primary', 'hsl(220, 20%, 94%)');
      root.style.setProperty('--text-secondary', 'hsl(220, 10%, 75%)');
      root.style.setProperty('--text-muted', 'hsl(220, 8%, 55%)');
    } else {
      // Default: warm-lime
      root.style.setProperty('--bg-primary', 'hsl(80, 20%, 96%)');
      root.style.setProperty('--bg-secondary', 'hsl(0, 0%, 100%)');
      root.style.setProperty('--bg-card', 'hsl(0, 0%, 100%)');
      root.style.setProperty('--bg-input', 'hsl(80, 10%, 93%)');
      root.style.setProperty('--border-color', 'hsl(80, 10%, 88%)');
      root.style.setProperty('--accent-primary', 'hsl(78, 82%, 35%)');
      root.style.setProperty('--accent-hover', 'hsl(78, 90%, 28%)');
      root.style.setProperty('--accent-light', 'hsla(78, 80%, 35%, 0.12)');
      root.style.setProperty('--accent-text', 'hsl(78, 85%, 26%)');
      root.style.setProperty('--text-primary', 'hsl(220, 24%, 12%)');
      root.style.setProperty('--text-secondary', 'hsl(220, 12%, 38%)');
      root.style.setProperty('--text-muted', 'hsl(220, 8%, 55%)');
    }
  }

  loadStoreConfigUI() {
    const config = window.db.get("store_config") || {
      mobileNavType: "footer",
      storeTheme: "warm-lime",
      catalogLayout: "grid",
      cartBehavior: "auto-open",
      mobileListFix: "font"
    };
    
    const navTypeEl = document.getElementById("config-nav-type");
    const catalogLayoutEl = document.getElementById("config-catalog-layout");
    const cartBehaviorEl = document.getElementById("config-cart-behavior");
    const storeThemeEl = document.getElementById("config-store-theme");
    const mobileListFixEl = document.getElementById("config-mobile-list-fix");
    
    if (navTypeEl) navTypeEl.value = config.mobileNavType || "footer";
    if (catalogLayoutEl) catalogLayoutEl.value = config.catalogLayout || "grid";
    if (cartBehaviorEl) cartBehaviorEl.value = config.cartBehavior || "auto-open";
    if (storeThemeEl) storeThemeEl.value = config.storeTheme || "warm-lime";
    if (mobileListFixEl) mobileListFixEl.value = config.mobileListFix || "font";
  }

  saveStoreConfig(event) {
    if (event) event.preventDefault();
    
    const config = {
      mobileNavType: document.getElementById("config-nav-type").value,
      catalogLayout: document.getElementById("config-catalog-layout").value,
      cartBehavior: document.getElementById("config-cart-behavior").value,
      storeTheme: document.getElementById("config-store-theme").value,
      mobileListFix: document.getElementById("config-mobile-list-fix").value
    };
    
    window.db.save("store_config", config);
    
    // Apply visual theme to ERP as well
    this.applyStoreTheme(config.storeTheme);
    
    alert("Configurações da loja salvas com sucesso!");
  }
}

// Instantiate global app and export
const app = new RanchoOrganicoApp();
window.app = app;

// Initialize on page load
window.addEventListener("DOMContentLoaded", () => {
  if (window.db && window.db.syncPromise) {
    window.db.syncPromise.then(() => {
      app.init();
    }).catch(err => {
      console.error("Erro na inicialização com Firestore:", err);
      app.init(); // fallback
    });
  } else {
    app.init();
  }
});
