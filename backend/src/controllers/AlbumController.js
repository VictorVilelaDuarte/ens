import bd from '../config/database';

class AlbumController {
  insere(req, res) {
    const { galeria } = req.body;
    req.files.map((item) => {
      const { filename: path } = item;
      const final_path = `${process.env.APP_URL}/files-galeria/${path}`;

      bd.query(
        `INSERT INTO ens_foto_galeria (Foto_Path, Foto_Galeria) values ('${final_path}', '${galeria}')`,
        (err) => {
          if (err) {
            return res.status(400).json({
              staus: false,
              message: 'Não foi possível salvar as fotos.',
            });
          }
        }
      );
    });
    return res.status(200).json({
      status: true,
      message: 'Fotos adicionadas com sucesso!',
    });
  }

  busca(req, res) {
    const { id } = req.params;
    bd.query(
      `SELECT F.Foto_Path
      FROM ens_galeria AS G, ens_foto_galeria as F
      WHERE G.Galeria_ID = F.Foto_Galeria AND G.Galeria_ID = ${id}`,
      (err, result) => {
        if (err) {
          return res.status(400).json({
            staus: false,
            message: 'Não foi possível buscar o album.',
          });
        }
        return res.status(200).json({
          status: true,
          data: result,
        });
      }
    );
  }

  deleta(req, res) {
    const { id } = req.params;
    bd.query(
      `DELETE FROM ens_foto_galeria WHERE Foto_ID=${id}`,
      (err, result) => {
        if (err) {
          return res.status(400).json({
            staus: false,
            message: 'Não foi possível excluir a foto.',
          });
        }
        return res.status(200).json({
          status: true,
          message: 'Foto deletada com sucesso!',
        });
      }
    );
  }
}

export default new AlbumController();
