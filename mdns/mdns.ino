#include <ESP8266WiFi.h>
#include <ESP8266mDNS.h>

const char *ssid     = "yummy!!!";
const char *password = "lithiumion";

String mdns_hosts[20];

void setup(){
  Serial.begin(115200);
 
//  Serial.setDebugOutput(true);
 
    Serial.println();
    Serial.println();
    Serial.println();
 
    for(uint8_t t = 4; t > 0; t--) {
        Serial.printf("[SETUP] BOOT WAIT %d...\n", t);
        Serial.flush();
        delay(1000);
    }
 
    WiFi.begin(ssid, password);
 
    while ( WiFi.status() != WL_CONNECTED ) {
      delay ( 500 );
      Serial.print ( "." );
    }
    Serial.print("Local IP: "); Serial.println(WiFi.localIP());

    if (!MDNS.begin("esp8266LocalMaster")) {             // Start the mDNS responder for esp8266.local
    Serial.println("Error setting up MDNS responder!");
  }
  Serial.println("mDNS responder started");
}

void find_mdns(){
  int n = MDNS.queryService("device-info", "tcp");
  String mdns_host;
  if (n == 0) {
    Serial.println("no services found");
  }
  else {
    for (int i = 0; i < n; ++i) {
      // Going through every available service,
      // we're searching for the one whose hostname 
      // matches what we want, and then get its IP
        mdns_host = String(MDNS.IP(i)[0]) + String(".") +\
          String(MDNS.IP(i)[1]) + String(".") +\
          String(MDNS.IP(i)[2]) + String(".") +\
          String(MDNS.IP(i)[3]);
        mdns_hosts[i] = mdns_host;
    }
  }
}

void loop(){
  
}
