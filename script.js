// ================================
// NovaOS Core
// ================================

let calculatorValue = "0";

// -------------------------------
// Clock
// -------------------------------

function updateClock() {
    const clock = document.getElementById("clock");

    const now = new Date();

    clock.textContent = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });
}

updateClock();
setInterval(updateClock, 1000);


// -------------------------------
// Open App
// -------------------------------

function openApp(appId) {

    const app = document.getElementById(appId);

    if (!app) return;

    app.style.display = "block";
}


// -------------------------------
// Close App
// -------------------------------

function closeApp(appId) {

    const app = document.getElementById(appId);

    if (!app) return;

    app.style.display = "none";
}


// -------------------------------
// Power Menu
// -------------------------------

function togglePowerMenu() {

    const menu = document.getElementById("powerMenu");

    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}


// -------------------------------
// Calculator
// -------------------------------

function calcInput(value) {

    const display = document.getElementById("calcDisplay");

    if (calculatorValue === "0") {
        calculatorValue = value;
    } else {
        calculatorValue += value;
    }

    display.value = calculatorValue;
}


function clearCalc() {

    calculatorValue = "0";

    document.getElementById("calcDisplay").value =
        calculatorValue;
}


function calculate() {

    const display = document.getElementById("calcDisplay");

    try {

        // Allow only calculator characters
        if (!/^[0-9+\-*/.() ]+$/.test(calculatorValue)) {
            throw new Error("Invalid expression");
        }

        const result = Function(
            `"use strict"; return (${calculatorValue})`
        )();

        if (!Number.isFinite(result)) {
            throw new Error("Invalid result");
        }

        calculatorValue = String(result);

        display.value = calculatorValue;

    } catch {

        calculatorValue = "0";

        display.value = "Error";
    }
}


// -------------------------------
// Notes
// -------------------------------

const notesArea = document.getElementById("notesArea");

if (notesArea) {

    notesArea.value =
        localStorage.getItem("novaNotes") || "";

    notesArea.addEventListener("input", function () {

        localStorage.setItem(
            "novaNotes",
            notesArea.value
        );

    });
}


// -------------------------------
// Theme
// -------------------------------

function toggleTheme() {

    document.body.classList.toggle("light-mode");

    const isLight =
        document.body.classList.contains("light-mode");

    localStorage.setItem(
        "novaTheme",
        isLight ? "light" : "dark"
    );
}


// Load saved theme

if (localStorage.getItem("novaTheme") === "light") {

    document.body.classList.add("light-mode");
}


// -------------------------------
// Keyboard Shortcuts
// -------------------------------

document.addEventListener("keydown", function (event) {

    // Escape closes open windows

    if (event.key === "Escape") {

        document
            .querySelectorAll(".app-window")
            .forEach(app => {
                app.style.display = "none";
            });

        document.getElementById("powerMenu").style.display =
            "none";
    }

});
