import bd from '../../config/database';

class OracaoController {
  insere(req, res) {
    const { titulo, data } = req.body;
    const { filename: path } = req.file;
    const final_path = `${process.env.APP_URL}/files-oracao/${path}`;

    bd.query(
      `INSERT INTO ens_oracao (Oracao_Titulo, Oracao_Path)
         VALUES ('${titulo}','${final_path}')`,
      (err) => {
        if (err) {
          return res.status(400).json({
            staus: false,
            message: 'Não foi possível salvar a oração.',
          });
        }
        return res.status(200).json({
          status: true,
          message: 'Oração adicionada com sucesso!',
        });
      }
    );
  }

  deleta(req, res) {
    const { id } = req.params;
    bd.query(`DELETE FROM ens_oracao WHERE Oracao_ID=${id}`, (err, result) => {
      if (err) {
        return res.status(400).json({
          staus: false,
          message: 'Não foi possível excluir a oração.',
        });
      }
      return res.status(200).json({
        status: true,
        message: 'Oração deletada com sucesso!',
      });
    });
  }
}

export default new OracaoController();
