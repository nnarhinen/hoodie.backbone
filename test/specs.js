var HoodieCollection, HoodieModel, expect, _ref, _ref1,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

expect = chai.expect;

HoodieModel = (function(_super) {
  __extends(HoodieModel, _super);

  function HoodieModel() {
    _ref = HoodieModel.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  HoodieModel.prototype.type = 'post';

  return HoodieModel;

})(Backbone.Model);

HoodieCollection = (function(_super) {
  __extends(HoodieCollection, _super);

  function HoodieCollection() {
    _ref1 = HoodieCollection.__super__.constructor.apply(this, arguments);
    return _ref1;
  }

  HoodieCollection.prototype.model = HoodieModel;

  return HoodieCollection;

})(Backbone.Collection);

describe("Backbone.Collection", function() {
  return describe("fetch()", function() {
    return it("should call hoodie.store.findAll", function(done) {
      var collection;

      window.hoodie = {
        store: {
          findAll: function(type) {
            expect(type).to.equal('post');
            return done();
          }
        }
      };
      collection = new HoodieCollection();
      return collection.fetch();
    });
  });
});

describe("Backbone.Model", function() {
  describe("fetch()", function() {
    return it("should call hoodie.store.find", function(done) {
      var model;

      window.hoodie = {
        store: {
          find: function(type, id) {
            expect(type).to.equal('post');
            expect(id).to.equal(123);
            return done();
          }
        }
      };
      model = new HoodieModel({
        id: 123
      });
      return model.fetch();
    });
  });
  describe("save(), new model", function() {
    return it("should call hoodie.store.add", function(done) {
      var model;

      window.hoodie = {
        store: {
          add: function(type, attributes) {
            expect(type).to.equal('post');
            expect(attributes.title).to.equal('test title');
            return done();
          }
        }
      };
      model = new HoodieModel();
      return model.save({
        title: 'test title'
      });
    });
  });
  describe("save(), existing model", function() {
    return it("should call hoodie.store.update", function(done) {
      var model;

      window.hoodie = {
        store: {
          update: function(type, id, attributes) {
            expect(type).to.equal('post');
            expect(id).to.equal(123);
            expect(attributes.title).to.equal('test title updated');
            return done();
          }
        }
      };
      model = new HoodieModel({
        id: 123,
        title: 'test title'
      });
      return model.save({
        title: 'test title updated'
      });
    });
  });
  return describe("destroy()", function() {
    return it("should call hoodie.store.remove", function(done) {
      var model;

      window.hoodie = {
        store: {
          remove: function(type, id) {
            expect(type).to.equal('post');
            expect(id).to.equal(123);
            return done();
          }
        }
      };
      model = new HoodieModel({
        id: 123
      });
      return model.destroy();
    });
  });
});
