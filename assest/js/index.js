// Función para validar formulario
function validarFormulario() {
  const nombre = document.getElementById("nombre").value.trim();
  const apellido = document.getElementById("apellido").value.trim();
  const fechaNacimiento = document
    .getElementById("fechaNacimiento")
    .value.trim();
  const correoElectronico = document
    .getElementById("correoElectronico")
    .value.trim();
  const cargo = document.getElementById("cargo").value;
  const fechaIngreso = document.getElementById("fechaIngreso").value.trim();

  if (
    !nombre ||
    !apellido ||
    !fechaNacimiento ||
    !correoElectronico ||
    !cargo ||
    !fechaIngreso
  ) {
    mostrarMensaje("Por favor complete todos los campos", "error");
    return;
  }

  if (!validarCorreoUnico(correoElectronico)) {
    mostrarMensaje("El correo electrónico ya está registrado", "error");
    return;
  }

  if (!validarEdad(fechaNacimiento)) {
    mostrarMensaje("El usuario debe tener al menos 18 años", "error");
    return;
  }

  mostrarModal(
    nombre,
    apellido,
    fechaNacimiento,
    correoElectronico,
    cargo,
    fechaIngreso
  );
}

// Función para mostrar el modal de confirmación
function mostrarModal(
  nombre,
  apellido,
  fechaNacimiento,
  correoElectronico,
  cargo,
  fechaIngreso
) {
  const modalContent = document.getElementById("modalContent");
  modalContent.innerHTML = `
      <strong>Nombre:</strong> ${nombre}<br>
      <strong>Apellido:</strong> ${apellido}<br>
      <strong>Fecha de Nacimiento:</strong> ${fechaNacimiento}<br>
      <strong>Correo Electrónico:</strong> ${correoElectronico}<br>
      <strong>Cargo:</strong> ${cargo}<br>
      <strong>Fecha de Ingreso:</strong> ${fechaIngreso}<br>
    `;
  const confirmationModal = new bootstrap.Modal(
    document.getElementById("confirmationModal")
  );
  confirmationModal.show();
}

// Función para validar correo único
function validarCorreoUnico(correoElectronico) {
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  return !usuarios.some((u) => u.correoElectronico === correoElectronico);
}

// Función para validar edad (mínimo 18 años)
function validarEdad(fechaNacimiento) {
  const hoy = new Date();
  const fechaNac = new Date(fechaNacimiento);
  const edad = hoy.getFullYear() - fechaNac.getFullYear();
  const m = hoy.getMonth() - fechaNac.getMonth();
  return edad > 18 || (edad === 18 && m >= 0);
}

// Función para agregar un usuario
function agregarUsuario() {
  const nombreInput = document.getElementById("nombre");
  const apellidoInput = document.getElementById("apellido");
  const fechaNacimientoInput = document.getElementById("fechaNacimiento");
  const correoElectronicoInput = document.getElementById("correoElectronico");
  const cargoInput = document.getElementById("cargo");
  const fechaIngresoInput = document.getElementById("fechaIngreso");

  const nombre = nombreInput.value.trim();
  const apellido = apellidoInput.value.trim();
  const fechaNacimiento = fechaNacimientoInput.value.trim();
  const correoElectronico = correoElectronicoInput.value.trim();
  const cargo = cargoInput.value;
  const fechaIngreso = fechaIngresoInput.value.trim();

  const usuario = {
    nombre,
    apellido,
    fechaNacimiento,
    correoElectronico,
    cargo,
    fechaIngreso,
  };

  guardarUsuario(usuario);
  agregarUsuarioACuadricula(usuario);

  nombreInput.value = "";
  apellidoInput.value = "";
  fechaNacimientoInput.value = "";
  correoElectronicoInput.value = "";
  cargoInput.value = "";
  fechaIngresoInput.value = "";

  mostrarMensaje("Usuario agregado exitosamente", "success");
}

// Función para agregar usuario a la cuadrícula
function agregarUsuarioACuadricula(usuario) {
  const userGrid = document.getElementById("userGrid");
  const userCard = document.createElement("div");
  userCard.classList.add("user-card");

  userCard.innerHTML = `
      <strong>Nombre:</strong> ${usuario.nombre} ${usuario.apellido}<br>
      <strong>Correo Electrónico:</strong> ${usuario.correoElectronico}<br>
      <strong>Cargo:</strong> ${usuario.cargo}<br>
      <strong>Fecha de Ingreso:</strong> ${usuario.fechaIngreso}<br>
    `;

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.textContent = "X";
  deleteBtn.onclick = () => eliminarUsuario(usuario.correoElectronico);

  userCard.appendChild(deleteBtn);
  userGrid.appendChild(userCard);
}

// Función para guardar usuario en el almacenamiento local
function guardarUsuario(usuario) {
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  usuarios.push(usuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

// Función para cargar usuarios desde el almacenamiento local
function cargarUsuarios() {
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  usuarios.forEach((usuario) => {
    agregarUsuarioACuadricula(usuario);
  });
}

// Función para eliminar usuario
function eliminarUsuario(correoElectronico) {
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  usuarios = usuarios.filter(
    (usuario) => usuario.correoElectronico !== correoElectronico
  );
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  document.getElementById("userGrid").innerHTML = "";
  cargarUsuarios();
  mostrarMensaje("Usuario eliminado exitosamente", "success");
}

// Función para mostrar mensajes de éxito/error
function mostrarMensaje(mensaje, tipo) {
  const messageDiv = document.getElementById("message");
  messageDiv.textContent = mensaje;
  messageDiv.className = `alert alert-${
    tipo === "success" ? "success" : "error"
  }`;
  messageDiv.style.display = "block";

  setTimeout(() => {
    messageDiv.style.display = "none";
  }, 3000);
}

// Cargar usuarios al cargar la página
cargarUsuarios();
