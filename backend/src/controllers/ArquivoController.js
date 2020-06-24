import bd from '../../config/database';

class ArquivoController {
  async lista(req, res) {
    bd.query('SELECT * from ens_arquivo', (err, result) => {
      if (err) {
        return res.status(400).json({
          status: false,
          message: 'Não foi possivel buscar os informens.',
        });
      }
      return res.status(200).json({
        status: true,
        data: result,
      });
    });
  }

  insere(req, res) {
    const { titulo } = req.body;
    const { filename: path } = req.file;
    const final_path = `${process.env.APP_URL}/files-arquivos/${path}`;

    bd.query(
      `INSERT INTO ens_arquivo (Arquivo_Titulo, Arquivo_Path)
         VALUES ('${titulo}','${final_path}')`,
      (err) => {
        if (err) {
          return res.status(400).json({
            staus: false,
            message: 'Não foi possível o arquivo.',
          });
        }
        return res.status(200).json({
          status: true,
          message: 'Arquivo adicionado com sucesso!',
        });
      }
    );
  }

  deleta(req, res) {
    const { id } = req.params;
    bd.query(
      `DELETE FROM ens_arquivo WHERE Arquivo_ID=${id}`,
      (err, result) => {
        if (err) {
          return res.status(400).json({
            staus: false,
            message: 'Não foi possível excluir o arquivo.',
          });
        }
        return res.status(200).json({
          status: true,
          message: 'Arquivo deletado com sucesso!',
        });
      }
    );
  }
}

export default new ArquivoController();
