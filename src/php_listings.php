<?php
// api_listings.php
header("Access-Control-Allow-Origin: *"); // Importante per permettere a React di leggere i dati
header("Content-Type: application/json; charset=UTF-8");

// --- CONFIGURAZIONE ---
$clientId = "0oarepfm81nzH8Y855d7";
$clientSecret = "YDix6quKIuKR6aICk9tARa_UdKMM9-pvdwwT4BOHTHt_VsbhNXp7JiFyaGBRkbdu";
$authUrl = "https://open-api.guesty.com/oauth2/token";
$listingsUrl = "https://open-api.guesty.com/v1/listings";
$tokenFile = "guesty_token.json";

// ... INSERISCI QUI LE TUE FUNZIONI: getCachedToken e cacheToken ...
// (Per brevità non le ricopio, ma usa le stesse funzioni del tuo script originale)

function getCachedToken($file) { /* ... codice funzione ... */ return null; }
function cacheToken($file, $token, $expiresIn) { /* ... codice funzione ... */ }

// ... LOGICA AUTENTICAZIONE ...
// (Usa la logica del tuo script per ottenere $accessToken)
$accessToken = "TOKEN_FITTIZIO_O_RECUPERATO"; // Sostituisci con la logica reale

// ... FUNZIONE GET LISTINGS ...
function getGuestyListings($url, $accessToken) {
    // ... Tua logica cURL ...
    // Simulazione risultato per esempio:
    return [];
}

// 1. OTTIENI DATI REALI
// $listings = getGuestyListings($listingsUrl, $accessToken);
// Sostituisci la riga sopra con la chiamata reale.

// Simuliamo i dati per farti capire la struttura JSON necessaria se non hai la connessione attiva ora
// Rimuovi questa parte finta quando metti il codice vero
$listings = [/* ... array vuoto o riempito dalla chiamata curl ... */];

// 2. FILTRA I TOP 5 (La tua logica originale)
$top5 = $listings;
usort($top5, function($a, $b) {
    return ($b["reviews"]["averageOverallRating"] ?? 0) <=> ($a["reviews"]["averageOverallRating"] ?? 0);
});
$top5 = array_slice($top5, 0, 5);

// 3. RESTITUISCI JSON
echo json_encode($top5);
?>