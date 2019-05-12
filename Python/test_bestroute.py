import unittest

import json

import math

import bestroute


class LoadFromJSONTestCase(unittest.TestCase):
    def test_single(self):
        json_init = '{"orders": [{"x1": 10, "y1": 12, "x2": 11, "y2": 14, "load": 100}], "maxload": 1000}'
        expected_parsed_object = ([{'x1':10,'y1':12,'x2':11,'y2':14,'load':100}],1000)
        self.assertEqual(expected_parsed_object,bestroute.load_from_json(json_init))
    def test_multiple(self):
        json_init = '{"orders":[{"x1": 10, "y1": 12, "x2": 11, "y2": 14, "load": 100}, {"x1": 5.7, "y1": 0, "x2": 0.2, "y2": -5.4, "load": 0.3456}, {"x1": 10, "y1": 1, "x2": 1, "y2": 94855, "load": 342534.345432}], "maxload": 500}'
        expected_parsed_object = ([{'x1':10,'y1':12,'x2':11,'y2':14,'load':100},{'x1':5.7,'y1':0,'x2':0.2,'y2':-5.4,'load':0.3456},{'x1':10,'y1':1,'x2':1,'y2':94855,'load':342534.345432}],500)
        self.assertEqual(expected_parsed_object,bestroute.load_from_json(json_init))
    def test_empty_json(self):
        json_init=''
        self.assertEqual(([],0),bestroute.load_from_json(json_init))
    def test_no_orders(self):
        json_init='{}'
        self.assertEqual(([],0),bestroute.load_from_json(json_init))
    def test_not_a_list(self):
        json_init='{"orders": {"something":{"x1": 10, "y1": 12, "x2": 11, "y2": 14, "load": 100}}}'
        self.assertEqual(([],0),bestroute.load_from_json(json_init))
    def test_not_valid(self):
        json_init = '{"orders": [{"x1": 10, "y1": 12, "x2": 11, "load": 100}]}'
        self.assertEqual(([],0),bestroute.load_from_json(json_init))

class EncodeToJSONTestCase(unittest.TestCase):
    def test_multiple(self):
        points = [{'x': 2,'y': 4.5,'load': 100},{'x': 0.4,'y': 1.1,'load': 0.98},{'x': 1,'y': 7.77,'load': 50}]
        distance = 217
        expected_json='{"distance": 217, "points": [{"load": 100, "x": 2, "y": 4.5}, {"load": 0.98, "x": 0.4, "y": 1.1}, {"load": 50, "x": 1, "y": 7.77}]}'
        self.assertEqual(expected_json,bestroute.encode_to_json(points,distance))

    def test_empty(self):
        points = []
        distance = 0
        expected_json = '{"error": "invalid input"}'
        self.assertEqual(bestroute.encode_to_json(points,distance), expected_json)

class GetActionPointsTestCase(unittest.TestCase):
    def test_simple(self):
        orders = [{"x1": 1, "y1": 1, "x2": 1, "y2": 4, "load": 100}, {"x1": 0, "y1": 0, "x2": 1, "y2": 5, "load": 200}]
        expected_output = [{"x": 1, "y": 1, "value": 100}, {"x": 1, "y": 4, "value": -100}, {"x": 0, "y": 0, "value": 200},{"x": 1, "y": 5, "value": -200}]
        self.assertEqual(bestroute.get_action_points_from_orders(orders), expected_output)

class EvaluateActionPointsTestCase(unittest.TestCase):
    def test_simple(self):
        maxload = 1000
        action_points = [{"x": 1, "y": 1, "value": 100}, {"x": 1, "y": 4, "value": -100}, {"x": 1, "y": 0, "value": 200},{"x": 1, "y": 5, "value": -200}]
        expected_output = 1/12
        self.assertEqual(bestroute.evaluate_action_points(action_points,maxload), expected_output)

class CalculateTestCase(unittest.TestCase):
    def test_simple(self):
        (orders,maxload) = ([{"x1": 1, "y1": 1, "x2": 1, "y2": 4, "load": 100}, {"x1": 0, "y1": 0, "x2": 1, "y2": 5, "load": 200}], 1000)
        expected_output = ([{"x": 0, "y": 0, "load": 200}, {"x": 1, "y": 1, "load": 300}, {"x": 1, "y": 4, "load": 200}, {"x": 1, "y": 5, "load": 0}],(math.sqrt(2)+4))
        self.assertEqual(bestroute.calculate(orders,maxload), expected_output)

    def test_simple_w_overload(self):
        (orders,maxload) = ([{"x1": 1, "y1": 1, "x2": 1, "y2": 4, "load": 100}, {"x1": 0, "y1": 0, "x2": 1, "y2": 5, "load": 200}], 250)
        expected_output = ([{"x": 0, "y": 0, "load": 200}, {"x": 1, "y": 4, "load": 100}, {"x": 1, "y": 1, "load": 200}, {"x": 1, "y": 5, "load": 0}],(math.sqrt(17)+7))
        self.assertEqual(bestroute.calculate(orders,maxload), expected_output)

    def test_split_order(self):
        (orders,maxload) = ([{"x1": 1, "y1": 1, "x2": 1, "y2": 4, "load": 75}, {"x1": 1, "y1": 1, "x2": 1, "y2": 4, "load": 25}, {"x1": 0, "y1": 0, "x2": 1, "y2": 5, "load": 200}], 1000)
        expected_output = ([{"x": 0, "y": 0, "load": 200}, {"x": 1, "y": 1, "load": 300}, {"x": 1, "y": 4, "load": 200}, {"x": 1, "y": 5, "load": 0}],(math.sqrt(2)+4))
        self.assertEqual(bestroute.calculate(orders,maxload), expected_output)

    def test_overload(self):
        (orders,maxload) = ([{"x1": 1, "y1": 1, "x2": 1, "y2": 4, "load": 100}, {"x1": 0, "y1": 0, "x2": 1, "y2": 5, "load": 200}], 50)
        expected_output = ([],0)
        self.assertEqual(bestroute.calculate(orders,maxload), expected_output)

    def test_empty(self):
        self.assertEqual(bestroute.calculate([], 0), ([],0))

if __name__ == '__main__':
    unittest.main()
