#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include "DHT.h"

// Configuración WiFi
#define WIFI_SSID "Totalplay-75AD"
#define WIFI_PASSWORD "75ADFD68Mv2BxNkx"

// Configuración Firebase
#define FIREBASE_HOST "mi-proyecto-iot-b161b-default-rtdb.firebaseio.com"
#define FIREBASE_SECRET "qnb6YxukBZMFfJKgrUS5KxVwmIkQeQUPYsfbLsTR"

// Configuración DHT11
#define DHTPIN 4       // Pin donde está conectado el DHT11
#define DHTTYPE DHT11  // Tipo de sensor DHT

// Inicializar objetos
DHT dht(DHTPIN, DHTTYPE);
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

unsigned long sendDataPrevMillis = 0;
bool signupOK = false;

void setup() {
  Serial.begin(115200);
  dht.begin();
  
  // Conectar a WiFi
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Conectando a WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Conectado con IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();

  // Configurar Firebase
  config.host = FIREBASE_HOST;
  config.signer.tokens.legacy_token = FIREBASE_SECRET;
  
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
}

void loop() {
  if (Firebase.ready() && (millis() - sendDataPrevMillis > 10000 || sendDataPrevMillis == 0)) {
    sendDataPrevMillis = millis();
    
    // Leer datos del sensor DHT11
    float h = dht.readHumidity();
    float t = dht.readTemperature();  // Leer temperatura en Celsius
    
    // Verificar si la lectura falló
    if (isnan(h) || isnan(t)) {
      Serial.println("Error al leer el sensor DHT11!");
      return;
    }
    
    Serial.print("Humedad: ");
    Serial.print(h);
    Serial.print("%\t");
    Serial.print("Temperatura: ");
    Serial.print(t);
    Serial.println("°C");

    // Enviar datos a Firebase
    if (Firebase.RTDB.setFloat(&fbdo, "sensor/humedad", h)) {
      Serial.println("Humedad enviada a Firebase");
    } else {
      Serial.println("Error al enviar humedad: " + fbdo.errorReason());
    }
    
    if (Firebase.RTDB.setFloat(&fbdo, "sensor/temperatura", t)) {
      Serial.println("Temperatura enviada a Firebase");
    } else {
      Serial.println("Error al enviar temperatura: " + fbdo.errorReason());
    }
    
    // También podemos enviar ambos datos en un solo objeto JSON
    FirebaseJson json;
    json.set("temperatura", t);
    json.set("humedad", h);
    json.set("timestamp", millis());
    
    if (Firebase.RTDB.setJSON(&fbdo, "sensor/datos", &json)) {
      Serial.println("Datos completos enviados a Firebase");
    } else {
      Serial.println("Error al enviar datos completos: " + fbdo.errorReason());
    }
  }
}