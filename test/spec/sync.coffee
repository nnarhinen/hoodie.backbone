expect = chai.expect

class HoodieModel extends Backbone.Model
  type: 'post'

class HoodieCollection extends Backbone.Collection
  model: HoodieModel

describe "Backbone.Collection", ->
  describe "fetch()", ->
    it "should call hoodie.store.findAll", (done) ->
      window.hoodie =
        store:
          findAll: (type) ->
            expect(type).to.equal('post')
            done()
      collection = new HoodieCollection()
      collection.fetch()

describe "Backbone.Model", ->
  describe "fetch()", ->
    it "should call hoodie.store.find", (done) ->
      window.hoodie =
        store:
          find: (type, id) ->
            expect(type).to.equal('post')
            expect(id).to.equal(123)
            done()

      model = new HoodieModel
        id: 123
      model.fetch()
  describe "save(), new model", ->
    it "should call hoodie.store.add", (done) ->
      window.hoodie =
        store:
          add: (type, attributes) ->
            expect(type).to.equal('post')
            expect(attributes.title).to.equal('test title')
            done()
      model = new HoodieModel()
      model.save
        title: 'test title'
  describe "save(), existing model", ->
    it "should call hoodie.store.update", (done) ->
      window.hoodie =
        store:
          update: (type, id, attributes) ->
            expect(type).to.equal('post')
            expect(id).to.equal(123)
            expect(attributes.title).to.equal('test title updated')
            done()
      model = new HoodieModel
        id: 123
        title: 'test title'
      model.save
        title: 'test title updated'
  describe "destroy()", ->
    it "should call hoodie.store.remove", (done) ->
      window.hoodie =
        store:
          remove: (type, id) ->
            expect(type).to.equal('post')
            expect(id).to.equal(123)
            done()
      model = new HoodieModel
        id: 123
      model.destroy()
