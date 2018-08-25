const chakram = require('chakram'),
      expect = chakram.expect;

const baseUrl = 'http://127.0.0.1:4567/';

describe("CharCounterAPI", function () {

  describe('http protocol behaviour', function () {
    it("should return content-type set to application/json", function () {
      const response = chakram.get(baseUrl);

      expect(response).to.have.status(200);
      expect(response).to.have.header("content-type", "application/json; charset=utf-8");
      return chakram.wait();
    });

    it("should not return gzip encoded", function () {
      const response = chakram.get(baseUrl);

      expect(response).not.to.be.encoded.with.gzip;
      return chakram.wait();
    });
  });

  describe('count', function () {
    it("should h:1, e:1, l:2, o:1 when input is hello", function () {
      return chakram.get(baseUrl + 'count?input=hello')
        .then(function (result) {
          expect(result.body['h']).to.be.equals(1);
          expect(result.body['e']).to.be.equals(1);
          expect(result.body['l']).to.be.equals(2);
          expect(result.body['o']).to.be.equals(1);
        });
    });

    it("should return all lower case", function () {
      return chakram.get(baseUrl + 'count?input=HEllO')
        .then(function (result) {
          expect(result.body['h']).to.be.equals(1);
          expect(result.body['e']).to.be.equals(1);
          expect(result.body['l']).to.be.equals(2);
          expect(result.body['o']).to.be.equals(1);
        });
    });

    it("should ignore ! symbol", function () {
      return chakram.get(baseUrl + 'count?input=hi!')
        .then(function (result) {
          expect(result.body['h']).to.be.equals(1);
          expect(result.body['i']).to.be.equals(1);
          expect(result.body['!']).to.be.equals(undefined);
        });
    });

    it("should ignore ? symbol", function () {
      return chakram.get(baseUrl + 'count?input=hi?')
        .then(function (result) {
          expect(result.body['h']).to.be.equals(1);
          expect(result.body['i']).to.be.equals(1);
          expect(result.body['?']).to.be.equals(undefined);
        });
    });

    it("should omit accent marks so a = á", function () {
      return chakram.get(encodeURI(baseUrl + 'count?input=papá'))
        .then(function (result) {
          expect(result.body['p']).to.be.equals(2);
          expect(result.body['a']).to.be.equals(2);
          expect(result.body['á']).to.be.equals(undefined);
        });
    });

    it("should omit dieresis marks so a = ä", function () {
      return chakram.get(encodeURI(baseUrl + 'count?input=päpa'))
        .then(function (result) {
          expect(result.body['p']).to.be.equals(2);
          expect(result.body['a']).to.be.equals(2);
        });
    });
  });
});
