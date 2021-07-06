# PruebaMercadoLibre
Prueba backend Mutants MercadoLibre

*A continuación se expone la URL que hostea los servicios desarrollados.*
URL:http://ec2-44-194-55-250.compute-1.amazonaws.com

* El servicio “/mutant/” detecta si un humano es mutante enviando la secuencia de ADN mediante un HTTP POST con un Json el cual tenga el siguiente formato:
    * Mutante Vertical
      - Request
         POST → /mutant/
          {
          "dna":["ATGCGT","CTATAC","TTAAGT","TTATTG","CCCGTA","TCACTG"]
          }

      - Response
        ![image](https://user-images.githubusercontent.com/12835448/124671915-d15feb00-de7b-11eb-83f2-e4a57e1768f4.png)
    
    * Mutante Horizontal
      - Request
          POST → /mutant/
          {
          "dna":["ATGCGT","CAATAC","TTAAGT","TTGTTG","CCCCTA","TCACTG"]
          }
          
       - Response
          ![image](https://user-images.githubusercontent.com/12835448/124672473-b17cf700-de7c-11eb-81d5-f424f91869c7.png)
  
    * Mutante Obliqua
      - Request
          POST → /mutant/
          {
          "dna":["ATGCGT","CAATAC","TTAAGT","TAAATG","CCCGTA","TCACTG"]
          }
          
       - Response
          ![image](https://user-images.githubusercontent.com/12835448/124672473-b17cf700-de7c-11eb-81d5-f424f91869c7.png)
  
    * Humano
      - Request
          POST → /mutant/
          {
          "dna":["ATGCGT","CCATAC","TTAAGT","AAATTG","CCCGTA","TCACTG"]
          }
          
       - Response
          ![image](https://user-images.githubusercontent.com/12835448/124673077-d7ef6200-de7d-11eb-9883-621d9e1f880b.png)
          
* El servicio “/stats/” devuelve un Json con las estadísticas de las verificaciones de ADN:
     * Request
        GET → /stats/
     * Response
     ![image](https://user-images.githubusercontent.com/12835448/124673570-a88d2500-de7e-11eb-9e51-7193e791aab9.png)
     
* El servicio “/stats/reset” reinicia las estadísticas de las verificaciones de ADN:
     * Request
        GET → /stats/reset
     * Response
        ![image](https://user-images.githubusercontent.com/12835448/124673645-dffbd180-de7e-11eb-8734-a475f2f64809.png)
        
        
*Versión 1.0
