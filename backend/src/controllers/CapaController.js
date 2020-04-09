import bd from '../../config/database';

class CapaController {
  insere(req, res) {
    const { filename: path } = req.file;
    const { galeria } = req.body;
    const final_path = `${process.env.APP_URL}/files-capa/${path}`;

    bd.query(
      `SELECT * FROM ens_foto_capa WHERE Capa_Galeria = ${galeria}`,
      (err) => {
        if (err) {
          return res.status(400).json({
            staus: false,
            message: 'Não foi possível salvar a capa.',
          });
        }
        bd.query(
          `DELETE FROM ens_foto_capa WHERE Capa_Galeria = ${galeria}`,
          (err, result) => {
            if (err) {
              return res.status(400).json({
                staus: false,
                message: 'Não foi possível salvar a capa.',
              });
            }

            bd.query(
              `INSERT INTO ens_foto_capa (Capa_Path, Capa_Galeria) values ('${final_path}', '${galeria}')`,
              (err) => {
                if (err) {
                  return res.status(400).json({
                    staus: false,
                    message: 'Não foi possível salvar a capa.',
                  });
                }
                return res.status(200).json({
                  status: true,
                  message: 'Capa alterada com sucesso!',
                });
              }
            );
          }
        );
      }
    );
  }
}

export default new CapaController();
