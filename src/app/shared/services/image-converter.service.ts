import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageConverterService {
private readonly MAX_IMAGES = 5;
  private readonly MAX_SIZE = 200000; // 1 Mo en octets

  constructor() {}

  /**
   * Convertit et compresse une seule image en base64
   */
  async convertSingleImageToBase64(file: File, quality: number = 0.7): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith('image/')) {
        return reject('Fichier invalide : ce n’est pas une image.');
      }

      const reader = new FileReader();
      reader.onload = (event: any) => {
        const img = new Image();
        img.onload = () => {
          // Crée un canvas temporaire
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          // Redimensionne si l'image est trop grande
          const maxWidth = 1024;
          const maxHeight = 1024;
          let { width, height } = img;

          if (width > maxWidth || height > maxHeight) {
            const ratio = Math.min(maxWidth / width, maxHeight / height);
            width *= ratio;
            height *= ratio;
          }

          canvas.width = width;
          canvas.height = height;
          ctx?.drawImage(img, 0, 0, width, height);

          // Compression (JPEG avec qualité 0.7 par défaut)
          const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(compressedDataUrl);
        };
        img.onerror = () => reject('Erreur lors du chargement de l’image.');
        img.src = event.target.result;
      };

      reader.onerror = () => reject('Impossible de lire le fichier image.');
      reader.readAsDataURL(file);
    });
  }

  /**
   * Convertit et compresse un ensemble d’images
   */
  async convertMultipleImagesToBase64(files: File[], quality: number = 0.7): Promise<string[]> {
    const results: string[] = [];
    for (const file of files) {
      const base64 = await this.convertSingleImageToBase64(file, quality);
      results.push(base64);
    }
    return results;
  }

}
