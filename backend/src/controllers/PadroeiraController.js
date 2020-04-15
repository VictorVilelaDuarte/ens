import bd from '../../config/database';

class PadroeiraController {
  lista(req, res) {
    bd.query(`SELECT * FROM ens_padroeira`, (err, result) => {
      if (err) {
        return res.status(400).json({
          staus: false,
          message: 'Não foi possível buscar as padroeiras.',
        });
      }
      return res.status(200).json({
        status: true,
        data: result,
      });
    });
  }

  insere(req, res) {
    const { nome, descricao } = req.body;

    bd.query(
      `INSERT INTO ens_padroeira (Padroeira_Nome, Padroeira_Descricao)
         VALUES ('${nome}','${descricao}')`,
      (err) => {
        if (err) {
          return res.status(400).json({
            staus: false,
            message: 'Não foi possível salvar a padroeira.',
          });
        }
        return res.status(200).json({
          status: true,
          message: 'Padroeira adicionada com sucesso!',
        });
      }
    );
  }

  deleta(req, res) {
    const { id } = req.params;
    bd.query(
      `DELETE FROM ens_padroeira WHERE Padroeira_ID=${id}`,
      (err, result) => {
        if (err) {
          return res.status(400).json({
            staus: false,
            message: 'Não foi possível excluir a padroeira.',
          });
        }
        return res.status(200).json({
          status: true,
          message: 'Padroeira deletada com sucesso!',
        });
      }
    );
  }
}

export default new PadroeiraController();
