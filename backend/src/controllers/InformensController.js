import bd from '../../config/database';

class InformensController {
  insere(req, res) {
    const { titulo, data } = req.body;
    const { filename: path } = req.file;
    const final_path = `${process.env.APP_URL}/files-informens/${path}`;

    bd.query(
      `INSERT INTO ens_informens (Informens_Titulo, Informens_Path, Informens_Data)
         VALUES ('${titulo}','${final_path}', '${data}')`,
      (err) => {
        if (err) {
          return res.status(400).json({
            staus: false,
            message: 'Não foi possível o informens.',
          });
        }
        return res.status(200).json({
          status: true,
          message: 'Informens adicionado com sucesso!',
        });
      }
    );
  }

  deleta(req, res) {
    const { id } = req.params;
    bd.query(
      `DELETE FROM ens_informens WHERE Informens_ID=${id}`,
      (err, result) => {
        if (err) {
          return res.status(400).json({
            staus: false,
            message: 'Não foi possível excluir o informens.',
          });
        }
        return res.status(200).json({
          status: true,
          message: 'Informens deletado com sucesso!',
        });
      }
    );
  }
}

export default new InformensController();
