import bd from '../../config/database';

class MensagemController {
  lista(req, res) {
    bd.query(`SELECT * FROM ens_mensagem`, (error, results) => {
      if (error) {
        return res.status(400).json({
          staus: false,
          message: 'Não foi possível buscar as mensagens.',
        });
      }
      return res.status(200).json({
        status: true,
        data: results,
      });
    });
  }

  insere(req, res) {
    const { nome, assunto, conteudo, telefone, email } = req.body;
    bd.query(
      `INSERT INTO ens_mensagem (Mensagem_Nome, Mensagem_Assunto, Mensagem_Conteudo, Mensagem_Telefone, Mensagem_Email,
      Mensagem_Lida, Mensagem_Data)
       VALUES ('${nome}', '${assunto}', '${conteudo}', '${telefone}', '${email}', '0', NOW())`,
      (err) => {
        if (err) {
          console.log(err);
          return res.status(400).json({
            staus: false,
            message: 'Não foi possível enviar a mensagem.',
          });
        }
        return res.status(200).json({
          status: true,
          message: 'Mensagem enviada com sucesso!',
        });
      }
    );
  }

  busca(req, res) {
    const { id } = req.params;
    bd.query(
      `SELECT * FROM ens_evento WHERE Evento_ID=${id}`,
      (err, result) => {
        if (err) {
          return res.status(400).json({
            staus: false,
            message: 'Não foi possível buscar o evento.',
          });
        }
        return res.status(200).json({
          status: true,
          data: result,
        });
      }
    );
  }
}

export default new MensagemController();
