





-- Get match info name of the game, players that player and winners

SELECT m.id, g.name AS game_name, string_agg(p.name, ', ' ORDER BY mp.is_winner DESC) AS player_names, string_agg(CASE WHEN mp.is_winner THEN p.name END, ', ') AS winners
FROM Matches m
JOIN Games g ON m.game_id = g.id
JOIN Matches_Players mp ON m.id = mp.match_id
JOIN Players p ON mp.player_id = p.id
GROUP BY m.id, g.name;

-- Sort by group // All match data

SELECT m.id AS match_id, g2.id AS group_id, g2.name AS group_name, g.name AS game_name, m.date AS played_on, string_agg(p.name, ', ' ORDER BY mp.is_winner DESC) AS player_names, string_agg(CASE WHEN mp.is_winner THEN p.name END, ', ') AS winners, string_agg(CASE WHEN mp.is_loser THEN p.name END, ', ') AS losers
FROM Matches m
JOIN Games g ON m.game_id = g.id
JOIN Groups g2 ON g2.id = g.group_id AND g2.id = 1
JOIN Matches_Players mp ON m.id = mp.match_id
JOIN Players p ON mp.player_id = p.id
GROUP BY m.id, g.name, played_on, g2.id;

