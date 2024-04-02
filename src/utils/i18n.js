import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const translations = {
  en: {
    welcome: "Welcome",
    totalBalance: "Total Balance",
    incomeOfMonth: "Earned in the month",
    lossOfMonth: "Spent in the month",
    recentExpenses: "Recent expenses",
    seeAll: "See all",
    configuration: "Configuration",
    darkMode: "Dark mode",
    hideBalance: "Hide balance",
    language: "Language",
    logOut: "Log Out",
    currency: "Currency",
    allCategories: "All Categories",
    searchCategory: "Search by category name",
    Investment: "Investment",
    Loss: "Loss",
    Income: "Income",
    Others: "Others",
    Subscription: "Subscription",
    Rent: "Rent",
    Groceries: "Groceries",
    Dividend: "Dividend",
    Salary: "Salary",
    Sale: "Sale",
    Withdraw: "Withdraw",
    Purchase: "Purchase",
    Transfer: "Transfer",
    Deposit: "Deposit",
    Tax: "Tax",
    goBack: "Go back",
    createExpense: "Create new expense",
    writeExpenseTitle: "Write a title",
    expenseTitleError: "Please enter a title.",
    expenseAmountError: "Please enter an amount",
    expenseZeroError: "The amount must be other than zero.",
    descriptionExpense: "Write a description (optional)",
    selectCategory: "Select a category",
    create: "Create",
    allExpenses: "All expenses",
    reset: "Reset",
    filterByDate: "Filter by date",
    selectYear: "Select a year",
    January: "January",
    February: "February",
    March: "March",
    April: "April",
    May: "May",
    June: "June",
    July: "July",
    August: "August",
    September: "September",
    October: "October",
    November: "November",
    December: "December",
    None: "None",
    selectMonth: "Select a month",
    selectDate: "Select a date",
    filterByCategory: "Filter by category",
    filterByType: "Filter by type",
    selectAType: "Select a type",
    sortBy: "Sort by",
    orderBy: "Order by",
    creationDate: "Creation date",
    title: "Title",
    amount: "Amount",
    upward: "Upward",
    downward: "Downward",
    searchTitle: "Search by title",
    deleteExpense: "Delete expense",
    deleteWarning:
      "Are you sure you want to delete this expense? All information will be deleted and cannot be recovered",
    delete: "Delete",
    cancel: "Cancel",
    details: "Details",
    save: "Save",
    createCategory: "Create category",
    writeCategoryTitle: "Write a category name",
    expenseCategoryError: "Please enter a category name.",
    deleteCategory: "Delete category",
    deleteCategoryWarning:
      "Are you sure you want to delete this category? All information will be deleted and cannot be recovered",
    editCategory: "Edit category",
    statistics: "Your statistics",
    annualStatistics: "Annual statistics",
    year: "Year",
    totalIncome: "Total income",
    totalLoss: "Total loss",
    withoutCategory: "Without category",
    monthStatistics: "Month statistics",
    categoryStatistics: "Category statistics",
    month: "Month",
    profile: "Profile",
    deleteAccount: "Delete account",
    deleteAccountWarning:
      "Are you sure you want to delete your account? All information will be deleted and cannot be recovered",
    firstName: "First Name",
    firstNameError: "A first name is required.",
    lastName: "Last Name",
    lastNameError: "A last name is required.",
    phrase: "Record your everyday expenses and earnings",
    getStarted: "Get Started",
    signIn: "Sign in",
    emailError: "Please enter an email.",
    emailValidError: "Please enter a valid email.",
    passwordError: "Please enter a password.",
    passwordValidError:
      "Must contain a lowercase, an uppercase letter, a digit, a special character (@$!%*?&), and be 8 characters or longer.",
    forgotPassword: "Forgot password?",
    noAccount: "No account?",
    signUp: "Sign up",
    password: "Password",
    haveAccount: "Have account?",
    forgotPasswordDescription:
      "Enter your email for the verification process. It will be send a 6 digits code to the given address.",
    haveCode: "Have a code?",
    send: "Send",
    verifyCode: "Verify code",
    verifyCodeDescription: "Enter the 6 digits of the code you received.",
    codeError: "A code is required.",
    codeValidError: "The code must be six digits.",
    noCode: "Haven't receive the code? Try again",
    verify: "Verify",
    resetPassword: "Reset password",
    resetPasswordDescription:
      "Set your new password so you can login and access to your account again.",
    confirmPassword: "Confirm password",
    confirmPasswordError: "Please confirm your password.",
    passwordsNotMatch: "The passwords do not match.",
    reset: "Reset",
    categories: "Categories",
    categoryError: "You can only edit categories created by you",
    dataNotFound: "No results found",
    aboutUs: "About Us",
    aboutUsDescription:
      'The truth is, there is no "we" here. This application was developed by a single person, after several months of hard work and dedication, with great learning in the process. I have many plans for its improvement and still much to learn. If you like the application, I invite you to share your opinions and suggestions through my social networks. Additionally, you can contribute to its maintenance and growth by inviting me for a coffee. I thank you in advance for your support and the use you make of the app.',
    settings: "Settings",
    options: "Options",
    blockNotifications: "Block notifications",
    budget: "Monthly budget",
    warningBudget: "Budget Alert Percentage",
    budgetError: "Monthly budget must be greater than zero",
    warningBudgetError: "Budget Alert Percentage must be greater than zero",
    Save: "Save",
    notifications: "Notifications",
    budgetStatistics: "Budget statistics",
    monthExpenses: "Expenses of the month",
    remainingBalance: "Remaining balance",
    yourMonthlyBudget: "Your monthly budget is",
    andYouExpent: "You have spent",
    yourRemainingBalance: "Your remaining balance is",
    overbudget: "Over budget",
    almostOverbudget: "Almost over budget",
    withinBudget: "Within budget",
    noDescriptionProvided: "No description provided",
    savingTitleError: "A saving goal title must be provided",
    finalAmountError: "A final amount must be provided",
    finalAmountZeroError: "Final amount must be greater than zero",
    finalAmount: "Final amount",
    description: "Description",
    savingGoal: "Saving goal",
    deleteSavingGoal: "Delete savings goal",
    deleteSavingGoalWarning:
      "Are you sure you want to delete this savings goal? All progress will be deleted and cannot be recovered",
    savingGoalHelp:
      "In order to progress towards the goal you must create expenses with the 'Save' category and the amount must be negative.",
    noBudget: "No budget were set. Go to your profile to change it.",
    runOverBudget: "You went over budget",
    repeatEvery: "Repeat",
    days: "Days",
    weeks: "Weeks",
    months: "Months",
    years: "Years",
    repeatRequiredError: "A repetition must be specified",
    repeatInvalidError: "Repetition must be greater or equal to zero",
    firstRepetitionHelp:
      "If you choose 0 it means that the expense or income will be created automatically every day, month or year.",
    secondRepetitionHelp:
      "If you update an expense that repeats in a certain way, then each expense that is created later will have the data from the last update.",
    thirdRepetitionHelp:
      "If you update any expense with repetition so that it is no longer repeated, then all subsequent creation will be cut. This does not apply to the elimination of the expense.",
    Mon: "Mon",
    Tues: "Tues",
    Wed: "Wed",
    Thurs: "Thurs",
    Fri: "Fri",
    Sat: "Sat",
    Sun: "Sun",
  },
  es: {
    Mon: "Lun",
    Tues: "Mar",
    Wed: "Mier",
    Thurs: "Jue",
    Fri: "Vie",
    Sat: "Sab",
    Sun: "Dom",
    thirdRepetitionHelp:
      "Si actualizas alguna expensa con repetición para que ya no se repita, entonces se cortara toda creación posterior. Esto no aplica para la eliminación de la expensa.",
    secondRepetitionHelp:
      "Si actualizas una expensa que se repite de cierta forma, entonces cada expensa que se cree luego tendrá los datos de la última actualización.",
    firstRepetitionHelp:
      "If you choose 0 it means that the expense or income will be created automatically every day, month or year.",
    repeatInvalidError: "La repetición debe ser mayor o igual a cero",
    repeatRequiredError: "Una repetición es requerida",
    days: "Días",
    weeks: "Semanas",
    months: "Meses",
    years: "Años",
    repeatEvery: "Repetir",
    runOverBudget: "Te pasaste del presupuesto",
    noBudget: "No se fijó ningún presupuesto. Ve a tu perfil para cambiarlo.",
    savingGoalHelp:
      "Para poder progresar en la meta debes crear gastos con la categoría de 'Ahorro' y el monto debe ser negativo.",
    deleteSavingGoal: "Eliminar meta de ahorro",
    deleteSavingGoalWarning:
      "¿Estás seguro de que deseas eliminar esta meta de ahorro? Todo progreso será eliminado y no podrá recuperarse",
    savingGoal: "Meta de ahorro",
    description: "Descripción",
    finalAmount: "Monto final",
    finalAmountError: "Un monto final es requerido",
    finalAmountZeroError: "El valor final debe ser mayor a cero",
    savingTitleError: "Un título para la meta de ahorro es requerido",
    noDescriptionProvided: "No description provided",
    withinBudget: "Dentro del presupuesto",
    almostOverbudget: "Casi por encima del presupuesto",
    overbudget: "Por encima del presupuesto",
    yourRemainingBalance: "Tu saldo restante es de",
    andYouExpent: "Has gastado",
    yourMonthlyBudget: "Tu presupuesto mensual es de",
    remainingBalance: "Saldo restante",
    monthExpenses: "Gastos del mes",
    budgetStatistics: "Estadísticas presupuestarias",
    notifications: "Notificaciones",
    Save: "Ahorro",
    budgetError: "El Presupuesto mensual debe ser mayor a cero",
    warningBudgetError:
      "El Porcentaje de alerta de presupuesto debe ser mayor a cero",
    budget: "Presupuesto mensual",
    warningBudget: "Porcentaje de alerta de presupuesto",
    blockNotifications: "Bloquear notificaciones",
    options: "Opciones",
    settings: "Ajustes",
    aboutUsDescription:
      'La verdad es que no hay un "nosotros" aquí. Esta aplicación fue desarrollada por una sola persona, tras varios meses de arduo trabajo y dedicación, con un gran aprendizaje en el proceso. Tengo muchos planes para su mejora y aún mucho por aprender. Si te agrada la aplicación, te invito a compartir tus opiniones y sugerencias a través de mis redes sociales. Además, puedes contribuir a su mantenimiento y crecimiento invitándome a un café. Agradezco de antemano tu apoyo y el uso que haces de la app.',
    aboutUs: "Sobre nosotros",
    dataNotFound: "No se han encontrado resultados",
    categoryError: "Solo puedes editar categorías creadas por ti.",
    categories: "Categorías",
    reset: "Restablecer",
    confirmPasswordError: "Por favor confirme su contraseña..",
    passwordsNotMatch: "Las contraseñas no coinciden.",
    confirmPassword: "Confirmar contraseña",
    resetPasswordDescription:
      "Establece tu nueva contraseña para que puedas iniciar sesión y acceder a tu cuenta nuevamente.",
    resetPassword: "Restablecer contraseña",
    verify: "Verificar",
    noCode: "¿No has recibido el código?",
    codeValidError: "El código debe tener seis dígitos.",
    codeError: "Un código es requerido.",
    verifyCodeDescription: "Ingresa los 6 dígitos del código que recibido.",
    verifyCode: "Verificar código",
    welcome: "Bienvenido/a",
    totalBalance: "Balance total",
    incomeOfMonth: "Ganado en el mes",
    lossOfMonth: "Gastado en el mes",
    recentExpenses: "Gastos recientes",
    seeAll: "Ver todo",
    configuration: "Configuración",
    darkMode: "Modo oscuro",
    hideBalance: "Ocultar saldo",
    language: "Idioma",
    logOut: "Cerrar sesión",
    currency: "Moneda",
    allCategories: "Todas las categorías",
    searchCategory: "Buscar por nombre de categoría",
    Investment: "Inversión",
    Loss: "Perdida",
    Income: "Ingreso",
    Others: "Otros",
    Subscription: "Suscripción",
    Rent: "Renta",
    Groceries: "Comestibles",
    Dividend: "Dividendo",
    Salary: "Salario",
    Sale: "Venta",
    Withdraw: "Retiro",
    Purchase: "Compra",
    Transfer: "Transferencia",
    Deposit: "Depósito",
    Tax: "Impuesto",
    goBack: "Volver",
    createExpense: "Registrar gasto",
    writeExpenseTitle: "Escribe un título",
    expenseTitleError: "Por favor, ingresa un título.",
    expenseAmountError: "Por favor, ingresa un monto.",
    expenseZeroError: "El monto debe ser distinto de cero.",
    descriptionExpense: "Escribe una descripción (opcional)",
    selectCategory: "Selecciona una categoría",
    create: "Crear",
    allExpenses: "Todos los gastos",
    reset: "Restablecer",
    filterByDate: "Filtrar por fecha",
    selectYear: "Selecciona un año",
    January: "Enero",
    February: "Febrero",
    March: "Marzo",
    April: "Abril",
    May: "Mayo",
    June: "Junio",
    July: "Julio",
    August: "Agosto",
    September: "Septiembre",
    October: "Octubre",
    November: "Noviembre",
    December: "Diciembre",
    None: "Ninguno",
    selectMonth: "Selecciona un mes",
    selectDate: "Selecciona un día",
    filterByCategory: "Filtrar por categoría",
    filterByType: "Filtrar por tipo",
    selectAType: "Selecciona un tipo",
    sortBy: "Clasificar por",
    orderBy: "Ordenar por",
    creationDate: "Fecha de creación",
    title: "Título",
    amount: "Monto",
    upward: "Ascendente",
    downward: "Descendente",
    searchTitle: "Buscar por título",
    deleteExpense: "Eliminar gasto",
    deleteWarning:
      "¿Estás seguro de que deseas eliminar este gasto? Toda la información será eliminada y no podrá recuperarse.",
    delete: "Eliminar",
    cancel: "Cancelar",
    details: "Detalles",
    save: "Guardar",
    createCategory: "Crear categoría",
    writeCategoryTitle: "Escribe el nombre de la categoría",
    expenseCategoryError: "Por favor, ingresa un nombre para la categoría",
    deleteCategory: "Eliminar categoría",
    deleteCategoryWarning:
      "¿Estás seguro de que deseas eliminar esta categoría? Toda la información será eliminada y no podrá recuperarse.",
    editCategory: "Editar categoría",
    statistics: "Tus estadísticas",
    annualStatistics: "Estadísticas anuales",
    year: "Año",
    totalIncome: "Ingresos totales",
    totalLoss: "Perdidas totales",
    withoutCategory: "Sin categoría",
    monthStatistics: "Estadísticas mensuales",
    categoryStatistics: "Estadísticas por categoría",
    month: "Mes",
    profile: "Perfil",
    deleteAccount: "Eliminar perfil",
    deleteAccountWarning:
      "¿Estás seguro de que quieres eliminar tu cuenta? Toda la información será eliminada y no podrá recuperarse.",
    firstName: "Primer nombre",
    firstNameError: "Un primer nombre es requerido.",
    lastName: "Apellido",
    lastNameError: "Un apellido es requerido.",
    dangerousArea: "Area peligrosa",
    phrase: "Registre sus gastos e ingresos diarios",
    getStarted: "Comenzar",
    signIn: "Iniciar sesión",
    emailError: "Por favor, ingresa un email.",
    emailValidError: "Por favor, ingresa un email válido.",
    passwordError: "Por favor, ingresa una contraseña.",
    passwordValidError:
      "Debe contener una letra minúscula, una mayúscula, un dígito, un carácter especial (@$!%*?&) y tener 8 caracteres o más.",
    forgotPassword: "¿Olvidaste tu contraseña?",
    noAccount: "¿No tienes cuenta?",
    signUp: "Registrarse",
    password: "Contraseña",
    haveAccount: "¿Tienes una cuenta?",
    forgotPasswordDescription:
      "Ingresa tu email para el proceso de verificación. Se enviará un código de 6 dígitos a la dirección dada.",
    haveCode: "¿Tienes un código?",
    send: "Enviar",
  },
};

const i18n = new I18n(translations);
AsyncStorage.getItem("language", (value) => {
  i18n.locale = value ? value : "en";
});
i18n.enableFallback = true;

export default i18n;
