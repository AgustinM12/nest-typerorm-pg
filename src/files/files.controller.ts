import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) { }

  @Post()
  @UseInterceptors(FileInterceptor(
    'file',
    {
      storage: diskStorage({
        destination: './uploads',
        filename: function (req, file, cb) {
          cb(null, file.originalname + "_" + Date.now() + ".jpg")
        }
      })
    }
  ))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      msg: `Archivo ${file.filename} cargado correctamente`
    }
  }

}
