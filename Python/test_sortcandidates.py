import unittest

import json
import sortcandidates


class SortTestCase(unittest.TestCase):
    def test_single(self):
        orders = [{"x1": 1, "y1": 1, "x2": 1, "y2": 4, "load": 100}, {"x1": 2, "y1": 0, "x2": 0.5, "y2": -1.5, "load": 200}]
        maxload = 1000
        candidates = [{"x1": 0, "y1": 0, "x2": -1, "y2": -1, "load": 20}]
        expected_result = [{"candidate": {"load": 20, "x1": 0, "x2": -1, "y1": 0, "y2": -1}, "new_route": {"distance": 10.544862149253678, "poins": [{"load": 200, "x": 2, "y": 0}, {"load": 220, "x": 0, "y": 0}, {"load": 200, "x": -1, "y": -1}, {"load": 0, "x": 0.5, "y": -1.5}, {"load": 100, "x": 1, "y": 1}, {"load": 0, "x": 1, "y": 4}]}}]
        self.assertEqual(expected_result, sortcandidates.sort(orders, maxload, candidates))


##[{"x1": 10, "y1": 12, "x2": 11, "y2": 14, "load": 100}, {"x1": 5.7, "y1": 0, "x2": 0.2, "y2": -5.4, "load": 0.3456}, {"x1": 10, "y1": 1, "x2": 1, "y2": 94855, "load": 342534.345432}][{"x1": 10, "y1": 12, "x2": 11, "y2": 14, "load": 100}, {"x1": 5.7, "y1": 0, "x2": 0.2, "y2": -5.4, "load": 0.3456}, {"x1": 10, "y1": 1, "x2": 1, "y2": 94855, "load": 342534.345432}]

if __name__ == '__main__':
    unittest.main()
