import bd from '../../config/database';

class GaleriaController {
  lista(req, res) {
    bd.query(
      `SELECT G.Galeria_Titulo, G.Galeria_Data, C.Capa_Path
       FROM ens_galeria AS G
       JOIN ens_foto_capa AS C ON G.Galeria_ID = C.Capa_Galeria`,
      (err, result) => {
        if (err) {
          return res.status(400).json({
            staus: false,
            message: 'Não foi possível buscar os albuns.',
          });
        }
        return res.status(200).json({
          status: true,
          data: result,
        });
      }
    );
  }

  insere(req, res) {
    const { titulo, data } = req.body;
    bd.query(
      `INSERT INTO ens_galeria (Galeria_Titulo, Galeria_Data) VALUES ('${titulo}', '${data}')`,
      (err) => {
        if (err) {
          return res.status(400).json({
            staus: false,
            message: 'Não foi possível salvar o album.',
          });
        }
        return res.status(200).json({
          status: true,
          message: 'Album registrado com sucesso!',
        });
      }
    );
  }

  altera(req, res) {
    const { id } = req.params;
    const { titulo, data } = req.body;
    bd.query(
      `UPDATE ens_galeria SET Galeria_Titulo='${titulo}', Galeria_Data='${data}'`,
      (err) => {
        if (err) {
          return res.status(400).json({
            staus: false,
            message: 'Não foi possível salvar o album.',
          });
        }
        return res.status(200).json({
          status: true,
          message: 'Album atualizado com sucesso!',
        });
      }
    );
  }

  busca(req, res) {
    const { id } = req.params;
    bd.query(
      `SELECT G.Galeria_Titulo, G.Galeria_Data, C.Capa_Path
      FROM ens_galeria AS G
      JOIN ens_foto_capa AS C ON G.Galeria_ID = C.Capa_Galeria
      WHERE G.Galeria_ID = ${id}`,
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
    bd.query(`DELETE FROM ens_galeria WHERE Galeria_ID=${id}`, (err) => {
      if (err) {
        return res.status(400).json({
          staus: false,
          message: 'Não foi possível excluir o album.',
        });
      }
      return res.status(200).json({
        status: true,
        message: 'Album deletado com sucesso!',
      });
    });
  }
}

export default new GaleriaController();
