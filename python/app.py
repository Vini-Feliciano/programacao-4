from flask import Flask,request,jsonify
from flask_cors import CORS

from crud import criar,ler,atualizar,deletar,buscar_por_id

app = Flask(__name__)
CORS(app)

@app.route('/api/filmes', methods=['GET'])
def get_filmes():
    return jsonify(ler())

@app.route('/api/filmes', methods=['POST'])
def create_filme():
    dados = request.get_json()

    try:
        novo_filme = criar(
            dados.get('nome'),
            dados.get('genero')
        )
        return jsonify(novo_filme),201
    except ValueError as e:
        return jsonify({'erro': str(e)}),400

@app.route('/api/filmes/<int:id>', methods=['GET'])
def get_filme(id):
    filme = buscar_por_id(id)

    if filme:
        return jsonify(filme)
    return jsonify({'erro': 'filme não encontrado'}),404

@app.route('/api/filmes/<int:id>', methods=['PUT'])
def update_filme(id):
    dados = request.json
    try:
        filme_atualizado = atualizar(id,dados)
        return jsonify(filme_atualizado)
    except ValueError as e:
        return jsonify({'erro': str(e)}),404

@app.route('/api/filmes/<int:id>', methods=['DELETE'])
def delete_filme(id):
    deletar(id)

    return jsonify({'mensagem': 'filme deletado com sucesso'}),200


if __name__ == '__main__':
    app.run(debug=True,port=5000)